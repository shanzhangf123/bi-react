import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import http from './../../utils/ajax';
import apiName from './../../config/api-name';
import storage from './../../utils/storage';
import storageConfig from '../../config/storage-name';
import * as ws from './../../utils/websocket';
import ChatContent from './chat-content/chat-content';
import './chat.css';
import notification from './../../utils/notification';
import wsConfig from './../../config/ws-name.config';

class Chat extends Component {
  //   subscription;

  //getChildData

  getChildData (e, t, n) {
    console.log ('getChildData', e, t, n);
  }

  constructor (props) {
    super (props);
    this.state.subscription = notification
      .getNotification ()
      .subscribe (message => {
        // console.log ('监听到消息来了', message);
        this.buildNewMessage (message);
      });
  }

  state = {
    currentId: '', //当前聊天组id
    currentForm: '', //当前组类型
    memberList: [], //群成员列表
    max_time: '', //消息最大时间
    min_time: '', //消息最小时间
    msgList: [], // 当前显示聊天内容
    channelName: '',
    topic: '',
    buildMsg: [],
    channelInfo: {},
    sendMsg: '',
    subscription: null,
    sendList: {},
  };

  //声明周期
  componentWillReceiveProps (nextProps) {
    // console.log (88888, nextProps.location.search);
    if (nextProps.location.search) {
      this.getCurrentId (nextProps.location.search);
    }
  }

  componentDidMount () {
    // console.log ('聊天页面初始化完毕');
    if (this.props.location.search) {
      this.getCurrentId (this.props.location.search);
    }
  }

  //组件销毁
  componentWillUnmount () {
    // console.log ('组件销毁');
    this.state.subscription.unsubscribe ();
  }

  /**
     * 获取当前聊天组的id 和 类型
     */
  getCurrentId (str) {
    // console.log(str);
    let a = str.split ('?')[1].split ('&');
    let id = parseInt (a[0].split ('=')[1]);
    let form = parseInt (a[1].split ('=')[1]);
    let is_mission = parseInt (a[2].split ('=')[1]);
    // console.log(id, form, isProject);
    //字符串分割
    this.fetchGroupInfo (id);
    this.fetchGroupMessage (id, form, is_mission, 1);
  }

  /**
   * 新消息处理
   * @param {} id 
   */
  buildNewMessage (message) {
    if (message.act === wsConfig.ACT_CHAT_SEND_MESSAGE) {
      let userInfo = storage.getSessionstorage (storageConfig.USER_DATA);
      let companyInfo = storage.getSessionstorage (storageConfig.COMPANY_INFO);
      //   let form = storage.getSessionstorage (storageConfig.SESSION_ID);
      //   console.log ('message.data.gid', message.data.gid, this.state.currentId);
      if (message.data.gid === this.state.currentId) {
        // console.log (88888);
        if (message.data.sent && message.data.sent === 1) {
          //   console.log (9999);
          message.data.owner = this.state.currentForm === 1
            ? userInfo.uuid
            : companyInfo[0].psid;
          message.data.isSelf = true;
          message.data.msg = this.state.sendList.msg;
        }
        // message.data.msg = `哈哈${new Date ().getTime ()}`;
      }
      let tmpData = this.state.msgList;
      tmpData.push (message.data);
      this.setState ({msgList: tmpData, sendList: {}});
      //   console.log ('this.state.msgList', this.state.msgList);
      //   setTimeout (() => {
      this.scollbottom ();
      //   }, 300);
    }
  }

  /**
     * 获取群组消息
     */
  fetchGroupInfo (id) {
    let data = {
      gid: id,
    };
    http.axios_post (
      apiName.fetchGroupInfo,
      {
        data: data,
      },
      res => {
        if (res.status === 1) {
          // console.log('获取群组消息成功');
          this.setState ({
            memberList: res.data.info,
            channelName: res.data.name,
            topic: res.data.topic,
            currentForm: res.data.form,
            channelInfo: res.data,
            currentId: res.data.gid,
          });
        } else {
          console.error ('登录失败');
        }
      }
    );
  }

  /**
   * 滚动到底部
   * @param {} id 
   * @param {*} form 
   * @param {*} is_mission 
   * @param {*} sort 
   */

  scollbottom () {
    let element = document.getElementById ('chat-list');
    // console.log ('chat-list', element.scrollTop);
    // console.log ('chat-list', cont.scrollHeight);
    // console.log ('chat-list', cont.clientHeight);
    element.scrollTop = element.scrollHeight;
  }

  /**
     * 获取群组聊天记录
     */
  fetchGroupMessage (id, form, is_mission, sort) {
    let data = {
      is_mission: is_mission,
      gid: parseInt (id),
      form: form,
      sort: sort,
      min_time: this.state.max_time,
      max_time: this.state.min_time,
    };
    http.axios_post (
      apiName.getGroupMsg,
      {
        data: data,
      },
      res => {
        if (res.status === 1) {
          this.setState ({msgList: res.data.msg});
          this.buildMessageArrForDisplay ();
        } else {
          console.error ('登录失败');
        }
      }
    );
  }

  /**
     * 箭头输入框键盘事件
     */
  handleKeyUp = e => {
    if (e.keyCode === 13) {
      let token = 'tmsg_' + this.makeToken (); //生成token
      let newMessageObj = {
        form: this.state.currentForm,
        detail: {},
        msg: this.state.sendMsg,
        token: token,
        type: 1,
        identity: this.initGroupIdentity (
          this.state.currentForm,
          this.state.channelInfo.gid
        ),
        gid: this.state.channelInfo.gid,
        session_id: storage.getSessionstorage (storageConfig.SESSION_ID),
      };
      ws.onsend ({
        act: 102000,
        data: newMessageObj,
      });
      this.setState ({sendList: newMessageObj});
      this.setState ({sendMsg: ''});
    }
  };

  /**
     * 遍历消息 获取
     */
  buildMessageArrForDisplay () {
    let userInfo = storage.getSessionstorage (storageConfig.USER_DATA);
    let companyInfo = storage.getSessionstorage (storageConfig.COMPANY_INFO);
    let buildMsg = [];
    this.state.msgList.forEach (item => {
      if (item.owner === userInfo.uuid || item.owner === companyInfo[0].psid) {
        item.isSelf = true;
      } else {
        item.isSelf = false;
      }
      buildMsg.push (item);
    });
    this.setState ({buildMsg: buildMsg});
    setTimeout (() => {
      this.scollbottom ();
    }, 300);
  }

  /**
     * 生成群组聊天的identity
     */
  initGroupIdentity (form, id) {
    if (!form || !id) {
      return;
    }
    return `'group_form:'${form.toString ()}id:${id.toString ()}`;
  }

  /**
    * 生成message Token
    */
  makeToken () {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 7; i++) {
      text += possible.charAt (Math.floor (Math.random () * possible.length));
    }
    return text;
  }

  /**
   * 绑定输入框值
   */
  handleInputChange = e => {
    this.setState ({sendMsg: e.target.value});
  };

  render () {
    return (
      <div>
        <div className="chat-header">
          <div className="chat-name">{this.state.channelName}</div>
          <div className="chat-topic">{this.state.topic}</div>
        </div>
        <div className="chat-content">
          <ChatContent msgList={this.state.msgList} />
          <input
            type="text"
            onKeyUp={this.handleKeyUp}
            value={this.state.sendMsg}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="chat-right">
          <span>基本信息</span>
          <ul>
            {this.state.memberList.map ((item, index) => {
              return <div key={index}>{item.work_name}</div>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter (Chat);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import http from './../../utils/ajax';
import apiName from './../../config/api-name';
import storage from './../../utils/storage';
import storageConfig from '../../config/storage-name';
import * as ws from './../../utils/websocket';
import ChatContent from './chat-content/chat-content'
// import { Layout, Menu, Dropdown } from 'antd';
import './chat.css';

// const { Header, Sider, Content } = Layout;

class Chat extends Component {
    // constructor(props) {
    //     super(props)
    //     // this.fetchGroupInfo();
    // }
    state = {
        currentId: '', //当前聊天组id
        currentForm: '', //当前组类型
        memberList: [], //群成员列表
        max_time: '', //消息最大时间
        min_time: '', //消息最小时间
        msgList: [],// 当前显示聊天内容
        channelName: '',
        topic: '',
        buildMsg: [],
        channelInfo: {},
        sendMsg: ''
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search) {
            // console.log(88888)
            this.getCurrentId(nextProps.location.search);
        }
    }


    /**
     * 获取当前聊天组的id 和 类型
     */
    getCurrentId(str) {
        // console.log(str);
        let a = str.split('?')[1].split('&');
        let id = parseInt(a[0].split('=')[1]);
        let form = parseInt(a[1].split('=')[1]);
        let is_mission = parseInt(a[2].split('=')[1]);
        // console.log(id, form, isProject);
        //字符串分割
        this.fetchGroupInfo(id);
        this.fetchGroupMessage(id, form, is_mission, 1);
    }


    /**
     * 获取群组消息
     */
    fetchGroupInfo(id) {
        let data = {
            gid: id
        }
        http.axios_post(apiName.fetchGroupInfo, {
            data: data
        }, (res) => {
            if (res.status === 1) {
                // console.log('获取群组消息成功');
                this.setState({
                    memberList: res.data.info,
                    channelName: res.data.name,
                    topic: res.data.topic,
                    currentForm: res.data.form,
                    channelInfo: res.data
                });
            } else {
                console.error('登录失败')
            }
        })
    }


    /**
     * 获取群组聊天记录
     */
    fetchGroupMessage(id, form, is_mission, sort) {
        let data = {
            is_mission: is_mission,
            gid: parseInt(id),
            form: form,
            sort: sort,
            min_time: this.state.max_time,
            max_time: this.state.min_time,
        };
        http.axios_post(apiName.getGroupMsg, {
            data: data
        }, (res) => {
            if (res.status === 1) {
                this.setState({ msgList: res.data.msg });
                this.buildMessageArrForDisplay();
            } else {
                console.error('登录失败')
            }
        })
    }



    /**
     * 箭头输入框键盘事件
     */
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            let token = 'tmsg_' + this.makeToken(); //生成token
            let newMessageObj = {
                form: this.state.currentForm,
                detail: {},
                msg: this.state.sendMsg,
                token: token,
                type: 1,
                identity: this.initGroupIdentity(this.state.currentForm, this.state.channelInfo.gid),
                gid: this.state.channelInfo.gid,
                session_id: storage.getSessionstorage(storageConfig.SESSION_ID)
            };
            ws.onsend(
                {
                    act: 102000,
                    data: newMessageObj
                }
            );
            this.setState({ sendMsg: '' });
        }
    }


    /**
     * 遍历消息 获取
     */
    buildMessageArrForDisplay() {
        let userInfo = storage.getSessionstorage(storageConfig.USER_DATA);
        let buildMsg = [];
        this.state.msgList.forEach((item) => {
            if (item.owner === userInfo.uuid || item.owner === userInfo.psid) {
                item.isSelf = true;
            } else {
                item.isSelf = false;
            }
            buildMsg.push(item);
        })
        this.setState({ buildMsg: buildMsg })
    }

    /**
     * 生成群组聊天的identity
     */
    initGroupIdentity(form, id) {
        if (!form || !id) { return }
        return `'group_form:'${form.toString()}id:${id.toString()}`;
    }


    /**
    * 生成message Token
    */
    makeToken() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 7; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }


    handleInputChange = (e) => {
        this.setState({ sendMsg: e.target.value });
    }


    componentDidMount() {
        // console.log('聊天页面初始化完毕');
    }


    render() {
        return (
            <div>
                <div className="chat-header">
                    <div className="chat-name">{this.state.channelName}</div>
                    <div className="chat-topic">{this.state.topic}</div>
                </div>
                <div className="chat-content">
                    <ChatContent msgList={this.state.msgList} />
                    <input type="text" onKeyUp={this.handleKeyUp} value={this.state.sendMsg} onChange={this.handleInputChange} />
                </div>
                <div className="chat-right">
                    <span>基本信息</span>
                    <ul>
                        {
                            this.state.memberList.map((item, index) => {
                                return (
                                    <div key={index}>{item.work_name}</div>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(Chat);
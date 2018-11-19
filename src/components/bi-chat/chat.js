import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import http from './../../utils/ajax';
import apiName from './../../config/api-name';
import storage from './../../utils/storage';
import storageConfig from '../../config/storage-name'
// import { Layout, Menu, Dropdown } from 'antd';
import './chat.css'

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
        buildMsg: []
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
     * 遍历消息 获取
     */
    buildMessageArrForDisplay() {
        let userInfo = JSON.parse(storage.getSessionstorage(storageConfig.USER_DATA));
        // console.log('userInfo', userInfo, userInfo.psid);
        let buildMsg = [];
        this.state.msgList.map((item) => {
            if (item.owner === userInfo.uuid || item.owner === userInfo.psid) {
                item.isSelf = true;
            } else {
                item.isSelf = false;
            }
            console.log(',,,,', item);
            buildMsg.push(item);
        })
        // console.log('this.state.buildMsg', this.state.buildMsg);
        this.setState({ buildMsg: buildMsg })
    }


    componentDidMount() {
        console.log('聊天页面初始化完毕');
    }


    render() {
        return (
            <div>
                <div className="chat-header">
                    <div className="chat-name">{this.state.channelName}</div>
                    <div className="chat-topic">{this.state.topic}</div>
                </div>
                <div className="chat-content">
                    {
                        this.state.buildMsg.map((item, index) => {
                            return (
                                <div className={`warp ${item.isSelf ? 'is-self' : ''}` } key={index}>
                                    {item.msg}{item.isSelf}
                                </div>
                            )
                        })
                    }
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
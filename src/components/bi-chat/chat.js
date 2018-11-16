import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Layout } from 'antd';
// import LeftSide from './../bi-left-side/left-side';
// import BiHeader from './../bi-header/header';
// const { Content } = Layout;
import http from './../../utils/ajax';
import apiName from './../../config/api-name';

class Chat extends Component {


    state = {
        currentId: '',
        currentForm: '',
    };

    // constructor(props) {
    //     super(props)
    //     // console.log('事实上', this.props);
    // }

    componentWillUpdate(nextProps) {
        if (nextProps.location.search) {
            this.getCurrentId(nextProps.location.search);
        }
    }


    /**
     * 获取当前聊天组的id 和 类型
     */
    getCurrentId(str) {
        console.log(str);
        let a = str.split('?')[1].split('&');
        let id = parseInt(a[0].split('=')[1]);
        let form = parseInt(a[1].split('=')[1]);
        let isProject = parseInt(a[2].split('=')[1]);
        // console.log(id, form, isProject);
        //字符串分割
        this.fetchGroupInfo(id, form, isProject);

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
                console.log('获取群组消息成功')
            } else {
                console.error('登录失败')
            }
        })
    }





    componentDidMount() {
        console.log('聊天页面初始化完毕');
    }




    render() {
        return (
            <div>这是聊天</div>
        )
    }
}

export default withRouter(Chat);
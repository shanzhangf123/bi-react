import { Modal, Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import './login.css';
import http from './../../utils/ajax';
import storageConfig from './../../config/storage-name';
import storage from './../../utils/storage';
import apiName from './../../config/api-name';
import wsConfig from './../../config/ws-name.config';
import * as ws from './../../utils/websocket';
import { withRouter } from 'react-router-dom';



const FormItem = Form.Item;

class Login extends Component {

    // constructor(props) {
    //     super(props)
    // }

    state = {
        loading: false, //是否登录中
        visible: false, //是否显示弹窗
        username: '17751305916',
        password: '12345678'
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }


    /**
     * 取消登录
     */
    handleCancel = () => {
        this.setState({ visible: false });
    }

    /**
     * 绑定用户名change
     */
    usernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    /**
     * 绑定密码change
     */
    passwordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    /**
     * 点击登录
     */
    handleLogin = () => {
        this.setState({ loading: true });
        http.axios_post(apiName.userLogin, {
            username: this.state.username,
            password: this.state.password,
        }, (res) => {
            if (res.status === 1) {
                this.setState({ loading: false, visible: false });
                // sessionStorage.setItem('user-data', JSON.stringify(res.data));
                storage.setSessionStorage(storageConfig.USER_DATA, res.data.user);
                storage.setSessionStorage(storageConfig.SESSION_ID, res.data.session_id);
                storage.setSessionStorage(storageConfig.COMPANY_INFO, res.data.companies_information);
                this.loginWebsoket(res.data);
                this.props.history.push("/dashboard");
            } else {
                console.error('登录失败')
            }
        })
    }

    //登录IM websoket
    loginWebsoket = (data) => {
        // console.log('ws', data, ws);
        let sendData = {
            act: wsConfig.ACT_SYSTEM_IM_LOGIN,
            data: {
                uuid: data.user.uuid,
                psid: data.user.psid ? data.user.psid : '',
                session_id: data.session_id
            }
        }
        ws.onopen();
        ws.onsend(sendData);
    }





    //
    render() {
        const { visible, loading } = this.state;
        return (
            <div className="login-box">
                <Button className="login-botton" onClick={this.showModal}>
                    登入
                </Button>
                <Modal
                    visible={visible}
                    title="LOGIN"
                    centered
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>CANCEL</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleLogin}>
                            LOGIN
                        </Button>
                    ]}
                >
                    {/* 登录框内容 */}
                    <Form>
                        <FormItem>
                            <Input
                                size="large"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.usernameChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Input
                                size="large"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.passwordChange} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Login);
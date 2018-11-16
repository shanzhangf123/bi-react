import React, { Component } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom'
import './header.css'

const { Header } = Layout;

const menu = (
    <Menu className="user-drop">
        <Menu.Item key="0">
            <span>个人信息</span>
        </Menu.Item>
        <Menu.Item key="1">
            <span>公司信息</span>
        </Menu.Item>
        <Menu.Item key="2">
            <span>组织架构</span>
        </Menu.Item>
        <Menu.Item key="3">
            <span>流程</span>
        </Menu.Item>
        <Menu.Item key="4">
            <span>退出登录</span>
        </Menu.Item>
    </Menu>
);


class BiHeader extends Component {

    state = {
        theme: 'dark',
        current: '1',
    }

    handleSelect = (e) => {
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Header className="da-header" >
                <div className="logo" >
                    <img className="logo-png" alt="" src="https://static.blockbi.com/assets/images/bi.svg" />
                    <div className="user-info">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <span className="ant-dropdown-link" href="#">
                                Allen shan
                                </span>
                        </Dropdown>

                    </div>
                </div>
                <Menu
                    className="da-menu"
                    theme="dark"
                    mode="horizontal"
                    onClick={this.handleSelect}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        首页
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink exact to='/folder' className="blue">文件夹</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">关注信息</Menu.Item>
                    <Menu.Item key="4">项目</Menu.Item>
                    <Menu.Item key="5">
                        <NavLink exact to='/chat' className="blue">聊天</NavLink>
                    </Menu.Item>
                    <Menu.Item key="6">通知</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default BiHeader;
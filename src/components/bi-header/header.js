import React, {Component} from 'react';
import {Layout, Menu, Dropdown} from 'antd';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import storage from './../../utils/storage';
import storageConfig from '../../config/storage-name';
import './header.css';

const {Header} = Layout;

// const

class BiHeader extends Component {
  state = {
    theme: 'dark',
    current: '1',
    userInfo: {},
  };


  handleSelect = e => {
    this.setState ({
      current: e.key,
    });
  };

  //退出登录
  logout = () => {
    console.log ('退出登录');
    this.props.history.push ('login');
  };

  //获取当前用户信息
  componentDidMount () {
    let userInfo = storage.getSessionstorage (storageConfig.USER_DATA);
    console.log ('获取当前用户信息', this.state.userInfo);
    this.setState ({
      userInfo: userInfo,
    });
  }

  render () {
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
        <Menu.Item key="4" onClick={this.logout}>
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="da-header">
        <div className="logo">
          <img
            className="logo-png"
            alt=""
            src="https://static.blockbi.com/assets/images/bi.svg"
          />
          <div className="user-info">
            <Dropdown overlay={menu} trigger={['click']}>
              <span className="ant-dropdown-link" href="#">
                {this.state.userInfo.work_name}
              </span>
            </Dropdown>
          </div>
        </div>
        <Menu
          className="da-menu"
          theme="dark"
          mode="horizontal"
          onClick={this.handleSelect}
          style={{lineHeight: '64px'}}
        >
          <Menu.Item key="1">
            <NavLink exact to="/dashboard" className="blue">首页</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink exact to="/folder" className="blue">文件夹</NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink exact to="/attention" className="blue">关注信息</NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <NavLink exact to="/project" className="blue">项目</NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink exact to="/chat" className="blue">聊天</NavLink>
          </Menu.Item>
          <Menu.Item key="6">通知</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default withRouter (BiHeader);

import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import apiName from './../../config/api-name';
import http from './../../utils/ajax';
import './left-side.css';
import { withRouter } from 'react-router-dom';

// import storageConfig from './../../config/storage-name';
// import storage from './../../utils/storage';

const { SubMenu } = Menu;

const { Sider } = Layout;

class LeftSide extends Component {

    constructor(props) {
        super(props)
        this.fetchContactList();
        this.fetchGroupList();
    }

    state = {
        collapsed: false, //左侧列表隐藏还是展开
        contactList: {
            Internal: [],
            Friend: [],
            Cooperator: [],
        },
        chatList: {
            PRIVATE: [],
            PROJECT: [],
            RECENT: [],
            STARRED: [],
            WORK: [],
        }
    };

    //收起左侧菜单
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    //获取联系人列表
    fetchContactList() {
        // console.log('获取联系人列表');
        http.axios_post(apiName.contactList, {
            form: 0,
            group: 0,
        }, (res) => {
            if (res.status === 1) {
                this.setState({
                    contactList: res.data.staff
                });
            } else {
                console.error('获取联系人失败')
            }
        })
    }

    //获取聊天组列表
    fetchGroupList() {
        http.axios_post(apiName.chatList, {}, (res) => {
            if (res.status === 1) {
                this.setState({
                    chatList: res.data
                });
            } else {
                console.error('获取群组列表失败')
            }
        })
    }


    //页面渲染完成
    componentDidMount() {
        console.log('页面渲染结束');
    }


    //跳转到聊天页面
    routerToChat(e, item) {
        var path = {
            pathname: '/chat',
            search: `id=${item.gid}&form=${item.form}&m=${item.is_mission}`,
        }
        this.props.history.push(path);
    }





    render() {
        return (
            <Sider
                className='left-side'
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span>同事</span></span>}
                    >
                        {
                            this.state.contactList.Internal.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {item.work_name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="user" /><span>合作伙伴</span></span>}
                    >
                        {
                            this.state.contactList.Cooperator.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {item.work_name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={<span><Icon type="user" /><span>私人朋友</span></span>}
                    >
                        {
                            this.state.contactList.Friend.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {item.work_name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={<span><Icon type="team" /><span>收藏</span></span>}
                    >
                        {
                            this.state.chatList.STARRED.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {item.name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu
                        key="sub5"
                        className='test1111'
                        title={<span><Icon type="team" /><span>项目</span></span>}
                    >
                        {
                            this.state.chatList.PROJECT.map((item, index) => {
                                return (
                                    <Menu.Item key={index} >
                                        {item.name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu
                        key="sub6"
                        title={<span><Icon type="team" /><span>商业</span></span>}
                    >
                        {
                            this.state.chatList.WORK.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {item.name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu
                        key="sub7"
                        title={<span><Icon type="team" /><span>私人群组</span></span>}
                    >
                        {
                            this.state.chatList.PRIVATE.map((item, index) => {
                                return (
                                    <Menu.Item key={index}  >
                                        <div onClick={(e) => this.routerToChat(e, item)}>{item.name}</div>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu
                        key="sub8"
                        title={<span><Icon type="user" /><span>最近联系人</span></span>}
                    >
                        {
                            this.state.chatList.RECENT.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {item.work_name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(LeftSide);
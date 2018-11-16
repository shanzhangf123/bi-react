import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import LeftSide from './../bi-left-side/left-side';
import BiHeader from './../bi-header/header';
import './dashboard.css';
import Chat from './../bi-chat/chat';
import Folder from './../bi-folder/folder';

const { Content } = Layout;



class Dashboard extends Component {

    //handleClick
    handleClick() {
        // console.log('handleClick');
        // var a = ("WebSocket" in window)
        // console.log(a);
        // console.log('')
        // var ws = new WebSocket('ws://dev-bi-im.blockbi.com:9988/chat');
        // console.log('>>???!', ws);
    }
    //
    render() {
        return (
            <Layout>
                <BiHeader />
                <Layout>
                    <LeftSide />
                    <Content>
                        <div onClick={this.handleClick}>test</div>
                        <Route path="/folder" component={Folder} />
                        <Route path="/chat" component={(Chat)} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Dashboard;
import React, { Component } from 'react';
// import logo from './logo.svg';
import Login from './../bi-login/login';
import './homepage.css';


class Homepage extends Component {
    render() {
        return (
            <div className="pc-bd">
                <video src="https://static.blockbi.com/static/login/img/bi_bd.mp4" autoPlay="autoplay" loop="loop" id="video" muted>
                    您的浏览器不支持 video 标签。
                </video>
                <Login/>
            </div>
        )
    }
}

export default Homepage;
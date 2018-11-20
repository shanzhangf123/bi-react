import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import http from './../../../utils/ajax';
// import apiName from './../../../config/api-name';
// import storage from './../../../utils/storage';
// import storageConfig from '../../../config/storage-name';




export default class ChatContent extends Component {

    // constructor(props) {
    //     super(props);
    //     // console.log("props", props);
    // }

    render() {
        return (
            <div className="chat-lists">
                {
                    this.props.msgList.map((item, index) => {
                        return (
                            <div className={`warp ${item.isSelf ? 'is-self' : ''}`} key={index}>
                                {item.msg}{item.isSelf}
                            </div>
                        )
                    })
                }
            </div>
        )
    }


    componentWillReceiveProps() {

    }
}
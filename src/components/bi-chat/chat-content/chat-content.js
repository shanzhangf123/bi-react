import React, {Component} from 'react';

export default class ChatContent extends Component {
  constructor (props) {
    super (props);
    console.log ('');
  }

  // outputData () {
  //   // this.props.callback ('3333', '######');
  // }

  render () {
    return (
      <div className="chat-lists" id="chat-list">
        {this.props.msgList.map ((item, index) => {
          return (
            <div className={`warp ${item.isSelf ? 'is-self' : ''}`} key={index}>
              {item.msg}{item.isSelf}
            </div>
          );
        })}
        <div
          onClick={() => {
            this.props.callback (...['a', 'n', 'c']);
          }}
        >
          test
        </div>
      </div>
    );
  }
}

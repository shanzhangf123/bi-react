import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
// import Homepage from './components/bi-homepage/homepage'
import Dashboard from './components/bi-dashboard/dashboard';
import storageConfig from './config/storage-name';
import storage from './utils/storage';
import wsConfig from './config/ws-name.config';
import * as ws from './utils/websocket';
//
// import * as ws from './utils/websocket';

class App extends Component {
  constructor (props) {
    super (props);
    console.log ('触发了吗');
    ws.onclose ();
    ws.onopen ();
    // let sendData = {
    //   act: wsConfig.ACT_SYSTEM_IM_LOGIN,
    //   data: {
    //     uuid: storage.getSessionstorage (storageConfig.USER_DATA).uuid,
    //     psid: storage.getSessionstorage (storageConfig.COMPANY_INFO)[0]
    //       ? storage.getSessionstorage (storageConfig.COMPANY_INFO)[0].psid
    //       : '',
    //     session_id: storage.getSessionstorage (storageConfig.SESSION_ID),
    //   },
    // };
    // ws.onopen ();
    // ws.onsend (sendData);
  }

  render () {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default App;

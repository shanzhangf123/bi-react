import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Homepage from './../components/bi-homepage/homepage';
// import Dashboard from './../components/bi-dashboard/dashboard';
import App from './../App';
// import Chat from './../components/bi-chat/chat';
// import Folder from './../components/bi-folder/folder';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Homepage} />
            <Route exact path="/homepage" component={Homepage} />
            <Route exact path="/dashboard" component={App} />
            <Route exact path="/chat" component={App} />
            <Route exact path="/folder" component={App} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;

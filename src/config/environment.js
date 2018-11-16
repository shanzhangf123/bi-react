
console.log('dev2');

const environment = {
    hmr: false,
    production: false,
    homepageUrl: 'home',
    apiPrefix: 'api',
    domain: 'http://localhost/',
    staticResourceDomain: 'http://localhost:5002/',
    resourceDomain: 'http://devapiv2.blockbi.com/',
    resourceFolderDomain: 'http://devapiv2.blockbi.com/',
    resourceContactUsDomain: 'http://devadmin.blockbi.com/',
    socketDomain: 'ws://dev-bi-im.blockbi.com:9988/chat',
    requestByDomain: true,
    apiDomain: 'http://devapiv2.blockbi.com/api/',
    debug: true,
    socketReconnectInterval: 1000,
    socketReconnectMaxNum: 5,
    socketKeepOnlineInterval: 25000
};


export default environment;
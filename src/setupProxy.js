const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api', { target: 'http://devapiv2.blockbi.com' }));
};
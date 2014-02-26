/**
 * Create socket server
 *
 *
 */
var _ = require('lodash');
var sockjs = require('sockjs');
var BaseObject = require('../bootstrapping/base_object');

var SocketServer = function(httpServer){
    var self = this;
    this._open_sockets = [];
    this._registration_callbacks = [];

    this.server = sockjs.createServer();
    this.server.on('connection', function(conn) {
        // socket implements the SockJSConnection interface
        conn._sessionInstance = null;

        console.log('connection' + conn);
        conn.on('close', function() {
            self._open_sockets = _.without(self._open_sockets, conn);
            console.log('close ' + conn, self._open_sockets.length);
        });
        self._open_sockets.push(conn);
        
        //add new send method
        conn.send = function (data) {
            this.write(data);
        };
        conn.setSession = function(session){
            this._sessionInstance = session;
        };
        conn.sendError = function(reason){
            this.send(JSON.stringify({
                name: 'error',
                params: {
                    reason: reason,
                    HTTPstatuscode: '403'
                }
            }));
        };
        _.each(self._registration_callbacks, function (callback) {
            callback(conn);
        });
    });
    this.server.installHandlers(httpServer, {prefix:'/echo'});

    //register
    this.registry.setComponent('_streamDriver', this);
};

_.extend(SocketServer.prototype, BaseObject);

SocketServer.prototype.onNewConnection = function(callback){
    if(!_.isFunction(callback))
        throw new Error('onNewConnection require a callback function');
    this._registration_callbacks.push(callback);
}

// singleton
exports = module.exports = _.once(function (httpServer) {
    return new SocketServer(httpServer);
});
var _ = require('lodash');
var http = require('http');
var StreamDriver = require('./stream_driver');
var Session = require('./session');
var BaseObject = require('../bootstrapping/base_object');

var Server = function(){
    var self = this;
    this._server = http.createServer();
    this._stream = StreamDriver(this._server);
    // store session connected
    this._sessions = {};

    this._server.listen(9999, '0.0.0.0');
    this._stream.onNewConnection(function(conn){

        conn.on('close', function() {
            console.log('close ' + conn);
        });
        conn.on('data', function(message) {
            self._handleMessage(message, conn);
        });

    });

    //register
    this.registry.setComponent('_server', this);
};

_.extend(Server.prototype, BaseObject);

Server.prototype._handleConnect = function(conn){
    var _session = new Session(conn);
    this._sessions[_session.getId()] = _session;
};

Server.prototype._handleMessage = function(message, conn){
    try {
        var m = JSON.parse(message);
        if(m.name === 'connect')
            return this._handleConnect(conn);
        //if socket didnt connect, throw new error 
        if(!conn._sessionInstance)
            throw new Error('connect does not exist');
        conn._sessionInstance._processMessage(message);
    }
    catch (e) {
        conn.sendError(e.message);
    }
};

exports = module.exports = Server;
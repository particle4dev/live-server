var _ = require('lodash');
var hat = require('hat');
var BaseObject = require('../bootstrapping/base_object');

var Session = function(socket){
    var self = this;
    this._socket = socket;
    this._id = hat();

    this._socket.setSession(this);
    //send connected message
    this.sendConnected();
};

_.extend(Session.prototype, BaseObject);

Session.prototype.send = function (msg) {
    var self = this;
    if (self._socket) {
        self._socket.send(JSON.stringify(msg));
    }
    return true;
};

Session.prototype.getId = function (msg) {
    return this._id;
};

/**
 * connected message
 *
 */
Session.prototype.sendConnected = function (msg) {
    return this.send({
        name: 'connect',
        params: {
            status: 'connected',
            session: this.getId()
        }
    });
};

Session.prototype._processMessage = function (msg) {
    if(msg.name = 'hello')
        return this.send({
            name: 'hello dupe',
            params: {
                text: 'how are you ?'
            }
        });
};


exports = module.exports = Session;
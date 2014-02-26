/**
 *
 client -> server
 {"name":"connect","param":{}}

 server -> client
 {"name":"connect","params":{"status":"connected","session":"a7c69c49eb883f42e8b1d24826189b79"}}
 {"name":"error","params":{"reason":"connect does not exist","HTTPstatuscode":"403"}}
 */


var _ = require('lodash');
var BaseMessage = require('./base_type');

/**
 * Connect Message
 */
var ConnectMessage = function(socket){

};
_.extend(ConnectMessage.prototype, BaseMessage);
ConnectMessage.prototype.execute = function(){

};

/**
 * struct message:
 * {
 *  'name':
 *  'params':
 *
 * }
 *
 */


var _ = require('lodash');
var BaseObject = require('../bootstrapping/base_object');

var BaseMessage = {
    execute: function(session){
        throw new Error('Not implemented');
    }
};

_.extend(BaseMessage, BaseObject);

exports = module.exports = BaseMessage;
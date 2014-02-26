/**
 * Object contain components of system
 */
var _ = require('lodash');

var RegistrySystem = function(){
	this._server = null;
	this._streamDriver = null;

	this.setComponent = function(key, value){
		if (this[key]) {
			throw new Error('Unable to set var `' + key + '`. Already set.');
		}
		this[key] = value;
		return true;
	};
	this.getComponent = function(key){
		return this[key];
	};
};

// singleton
exports = module.exports = _.once(function () {
    return new RegistrySystem();
});
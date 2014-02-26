/**
 * The core object from which most other objects are derived.
 */
var RegistrySystem = require('./registry_system');

var BaseObject = {
	registry: RegistrySystem()
};

exports = module.exports = BaseObject;
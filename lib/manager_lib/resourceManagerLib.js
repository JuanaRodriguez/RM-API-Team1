/**
 * JsonManager Module.
 *
 * @fileoverview JsonManager module that json all.
 * @author  Aldo.Balderrama@fundacion-jala.org (Miguel Aldo Balderrama)
 * @version 1.0.0
 * @module manager_lib/jsonManager
 */

var requireManager = require('./requireManagerLib.js');

/**
 * Obtains config the framework.
 *
 * @return {json} return config in literal object.
 */
module.exports.getConfig = function () {
  return requireManager.getRequireConfig('config');
};

/**
 * Obtains looger the framework.
 *
 * @return {json} return logger in literal object.
 */
module.exports.getLooger = function () {
  return requireManager.getRequireJson('logger');
};

/**
 * Obtains nodeConfig the framework.
 *
 * @return {json} return nodeConfig in literal object.
 */
module.exports.getNodeConfig = function () {
  return requireManager.getRequireJson('node.config');
};

/**
 * Obtains requestMethod the framework.
 *
 * @return {json} return requestMethod in literal object.
 */
module.exports.getRequestMethod = function () {
  return requireManager.getRequireJson('requestMethod');
};

/**
 * Obtains resource(EndPoint) the framework.
 *
 * @return {json} return resource in literal object.
 */
module.exports.getResource = function () {
  return requireManager.getRequireJson('resource');
};

/**
 * Obtains resource(resourceJson) the framework.
 *
 * @return {json} return resource in literal object.
 */
module.exports.getResources = function () {
  return requireManager.getRequireJson('resources');
};

/**
 * Obtains room(roomJson) the framework.
 *
 * @return {json} return room in literal object.
 */
module.exports.getRoom = function () {
  return requireManager.getRequireJson('room');
};

/**
 * Obtains service(serviceJson) the framework.
 *
 * @return {json} return service in literal object.
 */
module.exports.getService = function () {
  return requireManager.getRequireJson('service');
};

/**
 * Obtains status the API Rest.
 *
 * @return {json} return status in literal object.
 */
module.exports.getStatus = function () {
  return requireManager.getRequireJson('status');
};

/**
 * Obtains constantVariables the API Rest.
 *
 * @return {json} return constantVariables in literal object.
 */
module.exports.getConstantVariables = function () {
  return requireManager.getRequireJson('constantVariables');
};

/**
 * Obtains outOfOrdersValues the API Rest.
 *
 * @return {json} return outOfOrdersValues in literal object.
 */
module.exports.getOutOfOrdersValues = function () {
  return requireManager.getRequireJson('outOfOrdersValues');
};

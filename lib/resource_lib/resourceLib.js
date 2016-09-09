/**
 * ResouceLib Module
 *
 * @fileoverview ResouceLib module that executes GET, PUT(update), POST(create) and DELETE requests for Resource.
 * @author  Daysi.Claros@jalasoft.com (Daysi Claros)
 * @version 1.0.0
 * @module resources_lib/resourceLib
 */

 /**Manager*/
 var requireManager = require('../manager_lib/requireManagerLib.js');
 var requestManager = requireManager.getRequireRequestManager();
 var resourceManager = requireManager.getRequireResourceManager();
 var LogManagement = requireManager.getRequireLogManagement();
 /**Varibles*/
var config = requireManager.getRequireConfig();
var request = requestManager.getRequestTokenLib();
var resource = resourceManager.getResource();
var method = resourceManager.getRequestMethod();

/**
 * The method gets all the resources created
 *
 * @param {function} callback, contains the error and the response.
 */

module.exports.get = function (callback) {
	var endPoint = resource.resources;
	 request.get(endPoint, function (err, res) {
		 LogManagement.log(resource.resources, endPoint, method.GET, err, res);
		 callback(err,res);
	});
};

/**
 * The module gets a resource given an id.
 *
 * @param {String} resourceId, contains the id of resource at get.
 * @param {function} callback, contains the error and the response.
 */

module.exports.getById = function (resourceId, callback) {
	var endPoint = resource.resources +'/'+ resourceId;
	request.get(endPoint, function (err, res) {
		LogManagement.log(resource.resources, endPoint, method.GET, err, res);
		callback(err, res);
	});
};

/**
 * The module creates a new resource.
 *
 * @param {json} json, contains a json file with the meeting attributes.
 * @param {function} callback, contains the error and the response.
 */

module.exports.create = function(Resourcejson, callback){
	var endPoint = resource.resources;
	request.create(endPoint, Resourcejson, function(err,res){
		LogManagement.log(resource.resources, endPoint, method.POST, err, res);
		callback(err,res);
	});
};

/**
 * The module deletes a specific resource given an id.
 *
 * @param {String} resourceId, contains the id of resource at delete.
 * @param {function} callback, contains the error and the response.
 */

module.exports.delete = function(resourceId, callback){
	var endPoint = resource.resources + '/'+ resourceId;
	request.delete(endPoint, function(err,res){
		LogManagement.log(resource.resources, endPoint, method.DELETE, err, res);
		callback(err,res);
	});
};

/**
 * The module updates a specific resource.
 *
 * @param {String} resourceId, contains the id of resource at update.
 * @param {json} json, contains a json file with the resource attributes that will be updated.
 * @param {function} callback, contains the error and the response.
 */

module.exports.update = function(resourceId, Resourcejson, callback){
	var endPoint = resource.resources +'/' + resourceId;
	request.update (endPoint, Resourcejson, function(err, res){
		LogManagement.log(resource.resources, endPoint, method.PUT, err, res);
		callback(err, res);
	});
};

/**
 * RoomLib Module
 *
 * @fileoverview roomLib module that executes GET and PUT(update) requests for Rooms.
 * @author  Jimmy.Romero@fundacion-jala.org (Jimmy Joel Romero Sejas)
 * @version 1.0.0
 * @module room_lib/roomLib
 */

 /**Manager*/
 var requireManager = require('../manager_lib/requireManagerLib.js');
 var requestManager = requireManager.getRequireRequestManager();
 var resourceManager = requireManager.getRequireResourceManager();
 var endPointManager = requireManager.getRequireEndPoinManager();
 var LogManagement = requireManager.getRequireLogManagement();
 /**Varibles*/
var request = requestManager.getRequestTokenLib();
var resource = resourceManager.getResource();
var room = endPointManager.getRoom();
var service = endPointManager.getService();
var constant = resourceManager.getConstantVariables();
var method = resourceManager.getRequestMethod();
var oneRoom = {};


/**
 * Module to UPDATE a Room by Id.
 *
 * @param {String} roomId Contains the Id of a Room.
 * @param {json} roomJson Contains a Json file with room attributes to update the room.
 * @param {function} callback Contains the error and the response.
 */
module.exports.update = function (roomId, roomJson, callback) {	
	var endPoint = resource.rooms + '/' + roomId;
	this.updateEndPoint(endPoint, roomJson, callback);
};

/**
 * Module to GET the Room.
 *
 * @param {String} endPoint Contains the endpoint.
 * @param {function} callback Contains the error and the response.
 */
module.exports.get = function(endPoint, callback){
	request.get(endPoint, function(err, res){
		LogManagement.log(resource.rooms, endPoint, method.GET, err, res);
		callback(err, res);
	});
};

/**
 *Module to GET all rooms.
 *
 * @param {function} callback Contains the error and the response.
 */
module.exports.getAllRooms = function(callback){	
	this.get(resource.rooms, callback);
};

/**
 * Module to GET a room.
 *
 * @param {String} roomId Contains the Id of a Room.
 * @param {function} callback Contains the error and the response.
 */
module.exports.getRoom = function(roomId, callback){
	var endPoint = resource.rooms + '/' + roomId;
	this.get(endPoint, callback);
};

/**
 * Module to GET all rooms by Service Id.
 *
 * @param {String} serviceId Contains the Id of a Service.
 * @param {function} callback Contains the error and the response.
 */
module.exports.getAllRoomsByServiceId = function(serviceId, callback){
	var endPoint = resource.services + '/' + serviceId + resource.rooms;
	this.get(endPoint, callback);
};

/**
 * Module to GET all rooms by Service Id and Room Id.
 *
 * @param {String} serviceId Contains the Id of a Service.
 * @param {String} roomId Contains the Id of a Room.
 * @param {function} callback Contains the error and the response.
 */
module.exports.getRoomByServiceIdAndRoomId = function(serviceId, roomId, callback){
	var endPoint = resource.services + '/' + serviceId + resource.rooms + '/' + roomId;
	this.get(endPoint, callback);
};

/**
 * Module to update a room by Service Id and Room Id.
 *
 * @param {String} serviceId Contains the Id of a Service.
 * @param {String} roomId Contains the Id of a Room.
 * @param {json} roomJson Contains a Json file with room attributes to update the room.
 * @param {function} callback Contains the error and the response.
 */
module.exports.updateByServiceIdAndRoomId = function(serviceId, roomId, roomJson, callback){
	var endPoint = resource.services + '/' + serviceId + resource.rooms + '/' + roomId;
	this.updateEndPoint(endPoint, roomJson, callback);
};

/**
 * Module to update a the endPoint.
 *
 * @param {String} endPoint Contains the endpoint.
 * @param {json} roomJson Contains a Json file with room attributes to update the room.
 * @param {function} callback Contains the error and the response.
 */
module.exports.updateEndPoint = function(endPoint, roomJson, callback){	
	request.update(endPoint, roomJson, function(err, res){
		LogManagement.log(resource.rooms, endPoint, method.PUT, err, res);
		callback(err, res);
	});
};

/**
 * This method GETS (getOneRoomExistent) an aleatory service.
 *
 * @param {function} callback contains the room object.
 */
module.exports.getRoomByDefault = function(callback) {
	service.getDefaultService(function(oneService){
		room.getAllRoomsByServiceId(oneService._id, function (err, res) {
			var oneRoom = res.body[constant.INDEX];
			callback(oneRoom);
		});
	});
};

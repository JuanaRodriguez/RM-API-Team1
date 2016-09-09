var expect = require('chai').expect;
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var room = endPointManager.getRoom();
var config = requireManager.getRequireConfig();;
var status = resourceManager.getStatus();

describe ('Rooms Acceptance Test', function(){
	this.timeout(config.timeout);
	var roomJson = {};
	var arrayRoom;
	
	var minimumRoom = 1;
	var roomTested = 1;
	var roomUnderTest;

	before(function(done){
		room.getRooms(function(err, res){
			expect(res.status).to.equal(status.OK);
			roomJson = res.body;
			arrayRoom = res.body
			done();
		});
	});

	after(function(done){
		var roomJsonUpdate = {
			enabled : true,
			location : 'string',
			customDisplayName : 'Room 002',
			code : 'string'
		};
		room.update(roomJsonUpdate, function(err, res){
			expect(res.status).to.equal(status.OK);
			roomJson = res.body;			
			done();
		});
	});

	it('GET /rooms', function(done){
		room.getRooms(function(err, res){
			expect(res.status).to.equal(status.OK);
			expect(roomJson.length).to.be.at.least(minimumRoom);
			done();
		});
	});

	it('GET /rooms/{roomId} Random', function(done){					
		if(expect(arrayRoom.length).to.be.at.least(minimumRoom)){							
			roomUnderTest = Math.floor(Math.random() * (arrayRoom.length - 1)) + 1;			
			room.getRoomByIdRandom(roomUnderTest, function(err, res){					
				expect(res.body._id).to.equal(arrayRoom[roomUnderTest]._id);
				expect(res.body.emailAddress).to.equal(arrayRoom[roomUnderTest].emailAddress);
				expect(res.body.displayName).to.equal(arrayRoom[roomUnderTest].displayName);
				expect(res.body.serviceId).to.equal(arrayRoom[roomUnderTest].serviceId);
				expect(res.body.__v).to.equal(arrayRoom[roomUnderTest].__v);		
				expect(res.body.resources).to.deep.equal(arrayRoom[roomUnderTest].resources);
				expect(res.body.enabled).to.equal(arrayRoom[roomUnderTest].enabled);
				expect(res.body.locationId).to.equal(arrayRoom[roomUnderTest].locationId);
				expect(res.body.customDislplayName).to.equal(arrayRoom[roomUnderTest].customDislplayName);
				expect(res.body.code).to.equal(arrayRoom[roomUnderTest].code);		
				done();
			});
		}
		else{
			expect(res.body).to.deep.equal(arrayRoom);				
		}
	});

	it('GET /rooms/{roomId}', function(done){
		room.getRoomById(function(err, res){      
			expect(res.status).to.equal(status.OK);
			var roomDefined = roomJson[roomTested];						
			expect(res.body._id).to.equal(roomDefined._id);
			expect(res.body.emailAddress).to.equal(roomDefined.emailAddress);
			expect(res.body.displayName).to.equal(roomDefined.displayName);
			expect(res.body.serviceId).to.equal(roomDefined.serviceId);
			expect(res.body.__v).to.equal(roomDefined.__v);
			expect(res.body.resources).to.deep.equal(roomDefined.resources);			
			expect(res.body.enabled).to.equal(roomDefined.enabled);
			expect(res.body.locationId).to.equal(roomDefined.locationId);
			expect(res.body.customDislplayName).to.equal(roomDefined.customDislplayName);
			expect(res.body.code).to.equal(roomDefined.code);	
			done();
		});
	});

	it('PUT /rooms/{roomId}',function (done){
		var roomJsonUpdate = {
			enabled : true,
			location : 'string',
			customDisplayName : 'update Room 002 ID TEST',
			code : 'string'
		};
		room.update(roomJsonUpdate, function (err, res){
			expect(res.status).to.equal(status.OK);
			var roomDefined = roomJson[roomTested];			
			expect(res.body._id).to.equal(roomDefined._id);
			expect(res.body.emailAddress).to.equal(roomDefined.emailAddress);
			expect(res.body.displayName).to.equal(roomDefined.displayName);
			expect(res.body.serviceId).to.equal(roomDefined.serviceId);
			expect(res.body.__v).to.equal(roomDefined.__v);
			expect(res.body.resources).to.deep.equal(roomDefined.resources);			
			expect(res.body.enabled).to.equal(roomDefined.enabled);
			expect(res.body.locationId).to.equal(roomDefined.locationId);
			expect(res.body.customDislplayName).to.equal(roomDefined.customDislplayName);
			expect(res.body.code).to.equal(roomDefined.code);
			done();
		});
	});

	it('GET /services/{serviceId}/rooms', function(done){
		room.getRoomByServices(function(err, res){
			expect(res.status).to.equal(status.OK);
			expect(roomJson.length).to.be.at.least(minimumRoom);			
			done();
		});
	});

	it('GET /services/{serviceId}/rooms/{roomId}', function(done){
		room.getRoomByIdAndServices(function(err, res){
			expect(res.status).to.equal(status.OK);
			var roomDefined = roomJson[roomTested];			
			expect(res.body._id).to.equal(roomDefined._id);
			expect(res.body.emailAddress).to.equal(roomDefined.emailAddress);
			expect(res.body.displayName).to.equal(roomDefined.displayName);
			expect(res.body.serviceId).to.equal(roomDefined.serviceId);
			expect(res.body.__v).to.equal(roomDefined.__v);
			expect(res.body.resources).to.deep.equal(roomDefined.resources);			
			expect(res.body.enabled).to.equal(roomDefined.enabled);
			expect(res.body.locationId).to.equal(roomDefined.locationId);
			expect(res.body.customDislplayName).to.equal(roomDefined.customDislplayName);
			expect(res.body.code).to.equal(roomDefined.code);
			done();
		});
	});

	it('PUT /services/{serviceId}/rooms/{roomId}', function(done){
		var roomJsonUpdate = {
			 enabled : true,
			location : 'PunataTest',
			customDisplayName : 'update Room 002 index test',
			code : 'string'
		};
		room.updateRoomByIdAndServices(roomJsonUpdate, function(err, res){   
			expect(res.status).to.equal(status.OK);
			var roomDefined = roomJson[roomTested];			
			expect(res.body._id).to.equal(roomDefined._id);
			expect(res.body.emailAddress).to.equal(roomDefined.emailAddress);
			expect(res.body.displayName).to.equal(roomDefined.displayName);
			expect(res.body.serviceId).to.equal(roomDefined.serviceId);
			expect(res.body.__v).to.equal(roomDefined.__v);
			expect(res.body.resources).to.deep.equal(roomDefined.resources);			
			expect(res.body.enabled).to.equal(roomDefined.enabled);
			expect(res.body.locationId).to.equal(roomDefined.locationId);
			expect(res.body.customDislplayName).to.equal(roomDefined.customDislplayName);
			expect(res.body.code).to.equal(roomDefined.code);			
			done();
		});
	});
});

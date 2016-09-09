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
	var defaultRoom;
	
	var minimumRoom = 1;
	var roomTested = 1;
	var roomUnderTest;

	before(function(done){
		room.getRoomByDefault(function (oneRoom){			
			defaultRoom = oneRoom;
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
		room.update(defaultRoom._id, roomJsonUpdate, function(err, res){
			expect(res.status).to.equal(status.OK);				
			done();
		});
	});

	
	it('GET /rooms', function(done){
		room.getAllRooms(function(err, res){
			expect(res.status).to.equal(status.OK);			
			done();
		});
	});

	it('GET /rooms/{roomId}', function(done){
		room.getRoom(defaultRoom._id, function(err, res){      
			expect(res.status).to.equal(status.OK);
			expect(res.body._id).to.equal(defaultRoom._id);
			expect(res.body.emailAddress).to.equal(defaultRoom.emailAddress);
			expect(res.body.displayName).to.equal(defaultRoom.displayName);
			expect(res.body.serviceId).to.equal(defaultRoom.serviceId);
			expect(res.body.__v).to.equal(defaultRoom.__v);
			expect(res.body.resources).to.deep.equal(defaultRoom.resources);			
			expect(res.body.enabled).to.equal(defaultRoom.enabled);
			expect(res.body.locationId).to.equal(defaultRoom.locationId);
			expect(res.body.customDislplayName).to.equal(defaultRoom.customDislplayName);
			expect(res.body.code).to.equal(defaultRoom.code);	
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
		room.update(defaultRoom._id, roomJsonUpdate, function (err, res){
			expect(res.status).to.equal(status.OK);					
			expect(res.body._id).to.equal(defaultRoom._id);
			expect(res.body.emailAddress).to.equal(defaultRoom.emailAddress);
			expect(res.body.displayName).to.equal(defaultRoom.displayName);
			expect(res.body.serviceId).to.equal(defaultRoom.serviceId);
			expect(res.body.__v).to.equal(defaultRoom.__v);
			expect(res.body.resources).to.deep.equal(defaultRoom.resources);			
			expect(res.body.enabled).to.equal(defaultRoom.enabled);
			expect(res.body.locationId).to.equal(defaultRoom.locationId);
			expect(res.body.customDislplayName).to.equal(defaultRoom.customDislplayName);
			expect(res.body.code).to.equal(defaultRoom.code);
			done();
		});
	});
});
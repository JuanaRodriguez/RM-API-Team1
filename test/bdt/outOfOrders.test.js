var expect = require('chai').expect;
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var outOfOrder = endPointManager.getOutOfOrder();
var constant = resourceManager.getConstantVariables();
var config = requireManager.getRequireConfig();
var status = resourceManager.getStatus();
var room = endPointManager.getRoom();

/*
Feature: Out-Of-Order

Scenario 1: Verify the correct assignment of an out-of-order created in a determined Room.
	Given I get an existent room.
	When I create an out-of-order on the room previously specify.
	Then ensure that the room has assigned the out-of-order.
*/

describe('Out-of-orders Bdt Test', function () {
	context('Scenario 1: Verify the correct assignment of an out-of-order created in a determined Room. ',function(){
		this.timeout(config.timeout);
		var Room = {};
		var OutOfOrder = {};

		it('Given I get an existent \'Room\'',function(done){
			room.getOneRoomExistent(function(oneRoom){
				Room =  oneRoom;
				done();
			});
		});

		it('I create an \'out-of-order\' on the room previously specify',function(done){
			var outOfOrderJson = {
				roomId : Room._id,
				from : "2017-09-03T22:30:00.000Z",
				to : "2017-09-03T23:00:00.000Z",
				title : "outOfOrder Test",
				sendEmail : false
			};
			outOfOrder.create(outOfOrderJson, function(err,res){
				OutOfOrder = res.body;
	     	    expect(res.status).to.equal(status.OK);
	            done();
			});
		});

		it('ensure that the room has assigned the \'out-of-order\'',function(done){
			outOfOrder.getById(constant.FULPATH, OutOfOrder._id, function(err,res){
				OutOfOrder = res.body;
	     	    expect(res.body.roomId).to.equal(OutOfOrder.roomId);
	            done();
			});
		});

		it('I delete the \'out-of-order\'  created',function(done){
			outOfOrder.delete(OutOfOrder._id, function(err, res) {
				expect(res.status).to.equal(status.OK);
	            done();
			});
		});
 	});

/*
Scenario 2: Verify an out-of-order deleted not exist more.
	Given I create an out-of-order.
	When I delete the out-of-order.
	Then I search by out-of-order Id, with an expect status code 404.
*/

 	context('Scenario 2: Verify an out-of-order deleted not exist more',function(){
		this.timeout(config.timeout);
		var OutOfOrder = {};

		it('Given I create an \'out-of-order\'',function(done){
			room.getOneRoomExistent(function(oneRoom){
				var outOfOrderJson = {
					roomId : oneRoom._id,
					from : "2017-09-03T22:30:00.000Z",
					to : "2017-09-03T23:00:00.000Z",
					title : "outOfOrder Test",
					sendEmail : false
				};
				outOfOrder.create(outOfOrderJson, function(err,res){
					OutOfOrder = res.body;
		     	    expect(res.status).to.equal(status.OK);
		            done();
				});
			});
			
		});

		it('When I delete the \'out-of-order\'',function(done){
			outOfOrder.delete(OutOfOrder._id, function(err, res) {
				expect(res.status).to.equal(status.OK);
	            done();
			});
		});

		it('Then I search by \'out-of-order\' Id, with an expect status code 404',function(done){
			outOfOrder.getById(constant.FULPATH, OutOfOrder._id, function(err,res){
				OutOfOrder = res.body;
	     	    expect(res.status).to.equal(status.NOT_FOUND);
	            done();
			});
		});
 	});

});

var expect = require('chai').expect;
var randomstring = require("randomstring");
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var config = requireManager.getRequireConfig();
var resource = endPointManager.getResource();
var resources = resourceManager.getResources();
var status = resourceManager.getStatus();


describe ('Resources Smoke Test', function (){
	this.timeout(config.timeout);
	var resourceJson = {};
	var resourceJsonUpdate = {};
	var name = resources.resourname + randomstring.generate({ length: 6, charset: 'alphabetic'});
	var nameup;

	before(function(done){
		resourceJson = {
			name: name,
			customName:resources.resourcusname,
			fontIcon: resources.resourfonticon,
  			from: resources.resourfrom,
			description: resources.resourdesc
		};
		resource.create (resourceJson, function(err,res){
			expect(res.status).to.equal(status.OK);
			resourceJson = res.body;
			done();
		});
	});

	after(function(done){
		resource.delete(resourceJson._id, function(err,res){
			expect(res.status).to.equal(status.OK);
			done();
		});
	});

	it('GET /resources - all resources', function(done){
		resource.get(function(err,res){
			expect(res.status).to.equal(status.OK);
			done();
		});
	});

	it('GET /resources/{resourceId}', function(done){
		resource.getById(resourceJson._id, function(err,res){
			expect(res.status).to.equal(status.OK);
			done();
		});
	});

	it('PUT /resources/{resourceId}', function(done){
		resourceJsonUpdate = {
			name : resourceJson.name + '-Update',
			customName: resourceJson.customName + '-Update',
			fontIcon: resourceJson.fontIcon + '-Update',
  			from: resourceJson.from + '-Update',
			description: resourceJson.description + '-Update'
		};
		resource.update(resourceJson._id, resourceJsonUpdate, function(err,res){
			expect(res.status).to.equal(status.OK);
			done();
		});
	})

});

describe ('Resources Smoke Test', function(){
	this.timeout(config.timeout);
	var resourceJson = {};
	var name = resources.resourname + randomstring.generate({ length: 6, charset: 'alphabetic'});

	it('POST / resources',function(done){
		resourceJson = {
			name: name,
			customName:resources.resourcusname,
			fontIcon: resources.resourfonticon,
  			from: resources.resourfrom,
			description: resources.resourdesc
		};
		resource.create (resourceJson, function(err,res){
			expect(res.status).to.equal(status.OK);
			resourceJson = res.body;
			done();
		});
	});

	after(function(done){
		resource.delete(resourceJson._id, function(err,res){
			expect(res.status).to.equal(status.OK);
			done();
		});
	});
});

describe ('Resources Smoke Test', function(){
	this.timeout(config.timeout);
	var resourceJson = {};
	var name = resources.resourname + randomstring.generate({ length: 6, charset: 'alphabetic'});

	before(function(done){
		resourceJson = {
			name: name,
			customName:resources.resourcusname,
			fontIcon: resources.resourfonticon,
  			from: resources.resourfrom,
			description: resources.resourdesc
		};
		resource.create (resourceJson, function(err,res){
			expect(res.status).to.equal(status.OK);
			resourceJson = res.body;
			done();
		});
	});

	it('DELETE /resources/{resourceId}',function(done){
		resource.delete(resourceJson._id, function(err,res){
			expect(res.status).to.equal(status.OK);
			done();
		});
	});
});

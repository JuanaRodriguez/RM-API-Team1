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

describe ('Resources Aceptance Test', function () {
	this.timeout(config.timeout);
	var resourceJson = {};
	var resourceJsonUpdate = {};
	var name = resources.resourname + randomstring.generate({ length: 6, charset: 'alphabetic'});
	var resJson = {};
	var quantity = 1
	var __v = 0;

	before(function(done) {
		resourceJson = {
			name : name,
			customName : resources.resourcusname,
			fontIcon: resources.resourfonticon,
  			from: resources.resourfrom,
			description: resources.resourdesc
		};

		resource.create (resourceJson, function(err,res){
			expect(res.status).to.equal(status.OK);
			resJson = res.body;
			done();
		});
	});

	after(function(done){
		resource.delete(resJson._id, function(err, res) {
			expect(res.status).to.equal(status.OK);
			done();
		});
	});

	it('GET /resources - all resources', function(done) {
		resource.get(function(err,res){
			expect(res.status).to.equal(status.OK);
			expect(res.body.length).to.be.at.least(quantity);
			done();
		});
	});

	it('GET /resources/{resourceId}', function(done) {
		resource.getById(resJson._id, function(err, res) {
			expect(res.status).to.equal(status.OK);
			expect(res.body.name).to.equal(resourceJson.name);
			expect(res.body.__v).to.equal(__v);
			expect(res.body.customName).to.equal(resourceJson.customName);
			expect(res.body.fontIcon).to.equal(resourceJson.fontIcon);
			expect(res.body.from).to.equal(resourceJson.from);
			expect(res.body.description).to.equal(resourceJson.description);
			done();
		});
	});

	it('PUT /resources/{resourceId}', function(done) {
		resourceJsonUpdate = {
			name: resJson.name + '-Update',
			customName: resJson.customName + '-Update',
			fontIcon: resJson.fontIcon + '-Update',
  			from: resJson.from + '-Update',
			description: resJson.description + '-Update'
		};
		resource.update(resJson._id, resourceJsonUpdate, function(err, res) {
			expect(res.status).to.equal(status.OK);
			expect(res.body.__v).to.equal(__v);
			expect(res.body.name).to.equal(resourceJsonUpdate.name);
			expect(res.body.customName).to.equal(resourceJsonUpdate.customName);
			expect(res.body.fontIcon).to.equal(resourceJsonUpdate.fontIcon);
			expect(res.body.from).to.equal(resourceJsonUpdate.from);
			expect(res.body.description).to.equal(resourceJsonUpdate.description);
			done();
		});
	})

});

describe ('Resources Aceptance Test', function(){
	
	this.timeout(config.timeout);
	var resourceJson={};
	var name= resources.resourname + randomstring.generate({ length: 6, charset: 'alphabetic'});
	var resJson={};
	var __v = 0;


	it('POST /resources',function(done){
		resourceJson = {
			name : name,
			customName : resources.resourcusname,
			fontIcon: resources.resourfonticon,
  			from: resources.resourfrom,
			description: resources.resourdesc
		};

		resource.create (resourceJson, function(err,res){
			expect(res.status).to.equal(status.OK);
			expect(res.body.__v).to.equal(__v);
			expect(res.body.name).to.equal(resourceJson.name);
			expect(res.body.customName).to.equal(resourceJson.customName);
			expect(res.body.fontIcon).to.equal(resourceJson.fontIcon);
			expect(res.body.from).to.equal(resourceJson.from);
			expect(res.body.description).to.equal(resourceJson.description);
			resJson = res.body;
			done();
		});
	});

	after(function(done){
		resource.delete(resJson._id, function(err, res) {
			expect(res.status).to.equal(status.OK);
			done();
		});
	});
});

describe ('Resources Aceptance Test', function(){
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
		resource.delete(resourceJson._id, function(err, res) {
			expect(res.status).to.equal(status.OK);

			resource.getById(resourceJson._id, function(err,res){
				expect(res.status).to.equal(status.NOT_FOUND);
				expect(res.body.code).to.equal('NotFoundError');
				expect(res.body.message).to.equal('Resource resource('+ resourceJson._id + '), was not found');
				done();
			});
		});
	});
});

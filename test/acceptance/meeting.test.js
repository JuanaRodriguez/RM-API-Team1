var expect = require('chai').expect;
var randomstring = require("randomstring");
var moment = require("moment");
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var meeting = endPointManager.getMeeting();
var config = requireManager.getRequireConfig();
var status = resourceManager.getStatus();
var length = 4;
var startTime = 1;
var endTime = 2;
var quantity = 1;

describe('Meetings Acceptance Test:', function () {
    this.timeout(config.timeout);
    var jsonCreateMeeting = {};
    var organizer = randomstring.generate({length: length, charset: 'alphabetic'});
    var title = randomstring.generate({length: length, charset: 'alphabetic'});
    var location = randomstring.generate({length: length, charset: 'alphabetic'});

    beforeEach(function (done) {
        jsonCreateMeeting = {
            organizer: organizer,
            title: title,
            start: moment().add(startTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            end: moment().add(endTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            location: location,
            roomEmail: 'room001@group1.local',
            resources: ["room001@group1.local"],
            attendees: ["eviraka@group1.local"]
        };
        meeting.create(jsonCreateMeeting, function (err, res) {
            jsonCreateMeeting = res.body;
            expect(res.status).to.equal(status.OK);
            expect(res.body.organizer).to.equal(jsonCreateMeeting.organizer);
            expect(res.body.title).to.equal(jsonCreateMeeting.title);
            expect(res.body.location).to.equal(jsonCreateMeeting.location);
            expect(res.body.roomEmail).to.equal(jsonCreateMeeting.roomEmail);
            expect(res.body.kind).to.equal(jsonCreateMeeting.kind);
            expect(res.body.__v).to.equal(jsonCreateMeeting.__v);
            done();
        });
    });

    afterEach(function (done) {
        meeting.delete(jsonCreateMeeting._id, function (err, res) {
            expect(res.status).to.equal(status.OK);
            meeting.getById(jsonCreateMeeting._id, function (err, res) {
                expect(res.status).to.equal(status.NOT_FOUND);
                done();
            });
        });
    });

    it('GET/services/{serviceId}/rooms/{roomId}/meetings/{meetingId}', function (done) {
        meeting.getById(jsonCreateMeeting._id, function (err, res) {
            expect(res.status).to.equal(status.OK);
            expect(res.body.organizer).to.equal(jsonCreateMeeting.organizer);
            expect(res.body.title).to.equal(jsonCreateMeeting.title);
            expect(res.body.location).to.equal(jsonCreateMeeting.location);
            expect(res.body.roomEmail).to.equal(jsonCreateMeeting.roomEmail);
            expect(res.body.kind).to.equal(jsonCreateMeeting.kind);
            expect(res.body.__v).to.equal(jsonCreateMeeting.__v);
            done();
        });
    });

    it('GET /services/{serviceId}/rooms/{roomId}/meetings', function (done) {
        meeting.get(function (err, res) {
            expect(res.status).to.equal(status.OK);
            expect(res.body.length).to.be.at.least(quantity);
            done();
        });
    });

    it('PUT /services/{serviceId}/rooms/{roomId}/meetings/{meetingId}', function (done) {
        var jsonUpdateMeeting = {
            start: moment().add(startTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            end: moment().add(endTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            title: title,
            optionalAttendees: [],
            attendees: ["eviraca@group1.local"]
        };
        meeting.update(jsonCreateMeeting._id, jsonUpdateMeeting, function (err, res) {
            jsonCreateMeeting = res.body;
            expect(res.status).to.equal(status.OK);
            expect(res.body.organizer).to.equal(jsonCreateMeeting.organizer);
            expect(res.body.title).to.equal(jsonCreateMeeting.title);
            expect(res.body.location).to.equal(jsonCreateMeeting.location);
            expect(res.body.roomEmail).to.equal(jsonCreateMeeting.roomEmail);
            expect(res.body.kind).to.equal(jsonCreateMeeting.kind);
            expect(res.body.__v).to.equal(jsonCreateMeeting.__v);
            done();
        });
    });

    it('POST /services/{serviceId}/rooms/{roomId}/meetings', function (done) {
        var jsonPostMeeting = {
            start: moment().add(startTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            end: moment().add(endTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            title: title,
            optionalAttendees: [],
            attendees: ["eviraca@group1.local"]
        };
        meeting.create(jsonPostMeeting, function (err, res) {
            jsonPostMeeting = res.body;
            expect(res.status).to.equal(status.OK);
            expect(res.body.organizer).to.equal(jsonPostMeeting.organizer);
            expect(res.body.title).to.equal(jsonPostMeeting.title);
            expect(res.body.location).to.equal(jsonPostMeeting.location);
            expect(res.body.roomEmail).to.equal(jsonPostMeeting.roomEmail);
            expect(res.body.kind).to.equal(jsonPostMeeting.kind);
            expect(res.body.__v).to.equal(jsonPostMeeting.__v);
            done();
        });
    });

    it('DELETE /services/{serviceId}/rooms/{roomId}/meetings/{meetingId}', function (done) {
        if (jsonCreateMeeting._id != null) {
            meeting.delete(jsonCreateMeeting._id, function (err, res) {
                expect(res.status).to.equal(status.OK);
                meeting.getById(jsonCreateMeeting._id, function (err, res) {
                    expect(res.status).to.equal(status.NOT_FOUND);
                    done();
                });
            });
        }
    });

});

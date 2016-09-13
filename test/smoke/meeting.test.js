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
// var service = endPointManager.getService();
var room = endPointManager.getRoom();
var time = resourceManager.getConstantVariables();


var length = 4;
var startTime = 1;
var endTime = 2;

describe('Meetings Smoke Test:', function () {
    this.timeout(config.timeout);
    var jsonCreateMeeting = {};
    var jsonPostMeeting = null;
    var serviceId = 0;
    var roomId = 0;

    var organizer = randomstring.generate({length: length, charset: 'alphabetic'});
    var title = randomstring.generate({length: length, charset: 'alphabetic'});
    var location = randomstring.generate({length: length, charset: 'alphabetic'});

    beforeEach(function (done) {
        room.getRoomByDefault(function (oneRoom) {
            roomId = oneRoom._id;
            serviceId = oneRoom.serviceId;
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
            meeting.create(serviceId, roomId, jsonCreateMeeting, function (err, res) {
                jsonCreateMeeting = res.body;
                expect(res.status).to.equal(status.OK);
                done();
            });
        });
    });

    afterEach(function (done) {
        if (jsonPostMeeting) {
            meeting.delete(jsonPostMeeting._id, function (err, res) {
                expect(res.status).to.equal(status.OK);
                jsonPostMeeting = null;
                done();
            });
        }
        meeting.delete(jsonCreateMeeting._id, function (err, res) {
            expect(res.status).to.equal(status.OK);
            done();
        });
    });

    it('GET/services/{serviceId}/rooms/{roomId}/meetings/{meetingId}', function (done) {
        meeting.getById(jsonCreateMeeting._id, function (err, res) {
            expect(res.status).to.equal(status.OK);
            done();
        });
    });

    it('GET /services/{serviceId}/rooms/{roomId}/meetings', function (done) {
        meeting.get(function (err, res) {
            expect(res.status).to.equal(status.OK);
            done();
        });
    });

    it('PUT /services/{serviceId}/rooms/{roomId}/meetings/{meetingId}', function (done) {
        var jsonUpdateMeeting = {
            start: moment().add(time.ADDFROM, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            end: moment().add(time.ADDTO, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            title: title,
            optionalAttendees: [],
            attendees: ["eviraca@group1.local"]
        };
        meeting.update(jsonCreateMeeting._id, jsonUpdateMeeting, function (err, res) {
            expect(res.status).to.equal(status.OK);
            done();
        });
    });

    it.only('POST /services/{serviceId}/rooms/{roomId}/meetings', function (done) {
        room.getRoomByDefault(function (oneRoom) {
            var roomIdPost = oneRoom._id;
            var serviceIdPost = oneRoom.serviceId;
            jsonPostMeeting = {
                start: moment().add(startTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                end: moment().add(endTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                title: title,
                optionalAttendees: [],
                attendees: ["eviraca@group1.local"]
            };
            meeting.create(serviceIdPost, roomIdPost, jsonPostMeeting, function (err, res) {
                expect(res.status).to.equal(status.OK);
                done();
            });
        });
    });

    it('DELETE /services/{serviceId}/rooms/{roomId}/meetings/{meetingId}', function (done) {
        if (jsonCreateMeeting) {
            meeting.delete(jsonCreateMeeting._id, function (err, res) {
                expect(res.status).to.equal(status.OK);
                done();
            });
        }

    });

});

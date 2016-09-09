var expect = require('chai').expect;
var meeting = require('../../lib/meeting_libs/meetingLib.js');
var config = require('../../config.json');
var status = require('../../resources/status.json');
var randomstring = require("randomstring");
var length = 5;
var startTime = 3;
var endTime = 4;
var moment = require("moment");

describe('Meetings Smoke Test:', function () {
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
            done();
        });
    });

    afterEach(function (done) {
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
            start: moment().add(startTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            end: moment().add(endTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            title: title,
            optionalAttendees: [],
            attendees: ["eviraca@group1.local"]
        };
        meeting.update(jsonCreateMeeting._id, jsonUpdateMeeting, function (err, res) {
            expect(res.status).to.equal(status.OK);
            done();
        });
    });
    //DESDE ACA
    it('POST /services/{serviceId}/rooms/{roomId}/meetings', function (done) {
        var jsonPostMeeting = {
            start: moment().add(startTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            end: moment().add(endTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            title: title,
            optionalAttendees: [],
            attendees: ["eviraca@group1.local"]
        };
        meeting.create(jsonPostMeeting, function (err, res) {
            expect(res.status).to.equal(status.OK);
            done();
        });
    });

    it('DELETE /services/{serviceId}/rooms/{roomId}/meetings/{meetingId}', function (done) {
        if (jsonCreateMeeting._id != null) {
            meeting.delete(jsonCreateMeeting._id, function (err, res) {
                expect(res.status).to.equal(status.OK);
                done();
            });
        }

    });

});

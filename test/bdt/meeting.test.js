var expect = require('chai').expect;
var meeting = require('../../lib/meeting_lib/meetingLib.js');
var config = require('../../config.json');
var status = require('../../resources/status.json');
var room = require('../../lib/room_lib/roomLib.js');
var randomstring = require("randomstring");
var length = 5;
var startTime = 3;
var endTime = 4;
var moment = require("moment");
/*
 Feature: Meeting
*/

describe('Meeting Bdt Test:', function () {
    this.timeout(config.timeout);
    /*
     Scenario 1: Verify that you can not create meetings with a nonexistent account.
     Given I have a room.
     When I have a meeting into the room with a nonexistent account.
     Then ensure that the meeting wasnt created 
     */
    context('Scenario 1: Verify that you can not create meetings with a nonexistent account.', function () {
        var roomObtenido = {};
        var jsonPostMeeting = {};
        var organizer = randomstring.generate({length: length, charset: 'alphabetic'});
        var title = randomstring.generate({length: length, charset: 'alphabetic'});
        var location = randomstring.generate({length: length, charset: 'alphabetic'});

        it('Given I have a room', function (done){
            room.getRoomById(function(err, res){
                roomObtenido = res.body;
                expect(res.status).to.equal(status.OK);
                done();
            });
        });
        it('When I have a meeting into the room with a nonexistent account', function (done) {
            jsonPostMeeting = {
                organizer: organizer,
                title: title,
                start : moment().add(startTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                end : moment().add(endTime, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                location: location,
                roomEmail: 'room001@group1.local',
                resources: ["room001@group1.local"],
                attendees: ["eviraka@group1.local"]
            };
            meeting.create(jsonPostMeeting, function (err, res) {
                jsonPostMeeting = res.body;
                expect(res.status).to.equal(status.OK);
                done();
            });
        });
        it('Then ensure that the meeting wasnt created', function (done) {
            meeting.getById(jsonPostMeeting._id,function (err, res) {
                expect(res.status).to.equal(status.NOT_FOUND);
                done();
            });
        });

    });
});

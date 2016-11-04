'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const app = require('../../../src/app');
const Schedule = app.service('schedules');
const User = app.service('users');
const authentication = require('feathers-authentication/client');
const bodyParser = require('body-parser');
var token;
//config for app to do authentication
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .configure(authentication());
//use http plugin
chai.use(chaiHttp);
//use should
var should = chai.should();

describe('schedule service', () => {
  //setup
  before((done) => {
    //start the server
    this.server = app.listen(3030);
    //once listening do the following
    this.server.once('listening', () => {
      // make sure the db doesn't contain any schedule
      Schedule.remove(null, () => {
        // make sure the db doesn't contain any user
        User.remove(null, () => {});
      });
      //create mock user
      User.create({
        'email': 'user@email.com',
        'password': 'igzSwi7*Creif4V$'
      }, () => {
        //setup a request to get authentication token
        chai.request(app)
          //request to /auth/local
          .post('/auth/local')
          //set header
          .set('Accept', 'application/json')
          //send credentials
          .send({
            'email': 'user@email.com',
            'password': 'igzSwi7*Creif4V$'
          })
          //when finished
          .end((err, res) => {
            //set token for auth in other requests
            token = res.body.token;
            done();
          });
      });
    });
  });
  //teardown after tests
  after((done) => {
    //delete all schedules in db
    Schedule.remove(null, () => {
      //delete all users in db
      User.remove(null, () => {
        //stop the server
        this.server.close(function() {});
        done();
      });
    });
  });
  it('registered the schedules service', () => {
    assert.ok(app.service('schedules'));
  });
  it('should post the schedule data', function(done) {
    //setup a request
    chai.request(app)
      //request to /store
      .post('/schedules')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer '.concat(token))
      //attach data to request
      .send({
        name: 'Jodo Gashuku',
      })
      //when finished do the following
      .end((err, res) => {
        res.body.should.have.property('name');
        res.body.name.should.equal('Jodo Gashuku');
        done();
      });
  });

  it('should update the schedule data', function(done) {
    chai.request(app)
      //request to /store
      .get('/schedules')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
      //when finished do the following
      .end((err, res) => {
        // test for put for a schedule /schedules/schedule_id
        chai.request(app)
          .put('/schedules/' + res.body.data[0]._id)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer '.concat(token))
          .send({
            name: 'JS Unconf'
          })
          .end(function(err, res) {
            res.body.should.have.property('name');
            res.body.name.should.equal('JS Unconf');
            done();
          });

      });
  });
});

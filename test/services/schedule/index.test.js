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
  .use(bodyParser.urlencoded({ extended: true }))
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
      //create some mock schedule items
      Schedule.create({
        name: 'JSConf',
      });
      Schedule.create({
        name: 'Leipzig School'
      });
      Schedule.create({
        name: 'Elixir'
      });
      Schedule.create({
        name: 'CodeCamp'
      });
      //create mock user
      User.create({
         'username': 'resposadmin',
         'password': 'igzSwi7*Creif4V$',
         'email' : 'aure@posteo.de',
         'roles': ['admin']
      }, () => {
        //setup a request to get authentication token
        chai.request(app)
            //request to /auth/local
            .post('/auth/local')
            //set header
            .set('Accept', 'application/json')
            //send credentials
            .send({
               'username': 'resposadmin',
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
    //delete contents of schedule in mongodb
    Schedule.remove(null, () => {
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
  it('should post the scheduleitem data', function(done) {
      //setup a request
      chai.request(app)
          //request to /store
          .post('/schedules')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer '.concat(token))
          //attach data to request
          .send({
              name: 'Jodo Gashuku',
          })
          //when finished do the following
          .end((err, res) => {
              res.body.should.have.property('name');
              res.body.name.should.equal('Jodo Gashuku');
              //res.body.should.have.property('price');
              //res.body.price.should.equal(12.99);
              //res.body.categories.should.be.an('array')
              //    .to.include.members(['dinner, pasta']);
              done();
          });
  });
});
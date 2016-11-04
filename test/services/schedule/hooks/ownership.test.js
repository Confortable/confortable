'use strict';

const assert = require('assert');
const ownership = require('../../../../src/services/schedule/hooks/ownership.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
//use should
var should = chai.should();

describe('schedule ownership hook', function() {
  it('should copy the user ID to the schedule\'s userID key', function() {
    const userId = Schema.Types.ObjectId;
    const mockHook = {
      type: 'before',
      app: {},
      params: {'user' : {'_id': userId}},
      result: {},
      data: {}
    };

    ownership()(mockHook);

    mockHook.data.should.have.property('userId');
    mockHook.data.userId.should.equal(userId);
  });
});

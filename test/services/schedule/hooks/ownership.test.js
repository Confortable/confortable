'use strict';

const assert = require('assert');
const ownership = require('../../../../src/services/schedule/hooks/ownership.js');
const chai = require('chai');
//use should
var should = chai.should();

describe('schedule ownership hook', function() {
  it('should copy the user ID to the schedule\'s userID key', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {'user' : {'_id': '58184043160d7f20054b72d9'}},
      result: {},
      data: {}
    };

    ownership()(mockHook);

    mockHook.data.should.have.property('userId');
    mockHook.data.userId.should.equal('58184043160d7f20054b72d9');
  });
});

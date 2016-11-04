'use strict';

const assert = require('assert');
const gravatar = require('../../../../src/services/user/hooks/gravatar.js');
const chai = require('chai');
//use should
var should = chai.should();

describe('user gravatar hook', function() {
  it('adds avatar url to the user\'s avatar key', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {
        'email': 'user@email.com'
      }
    };
    gravatar()(mockHook);
    mockHook.data.should.have.property('avatar');
    mockHook.data.avatar.should.be.a('string');
    mockHook.data.avatar.should.match(/https:\/\/s.gravatar.com\/avatar\/([0-9]|[a-z])+\?s=60/i);
  });
});

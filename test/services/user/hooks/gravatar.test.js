'use strict';

const assert = require('assert');
const gravatar = require('../../../../src/services/user/hooks/gravatar.js');
const chai = require('chai');
//use should
var should = chai.should();

describe('user gravatar hook', function() {
  it('adds a string to the user\'s avatar key', function() {// does not make sure that this string is a URL
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
    mockHook.data.avatar.should.have.length.above(0);
  });
});

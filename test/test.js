'use strict';

var assert = require('assert');

describe('Server', function() {
    describe('bootstrap', function() {
        it('should bootstrap without any error', function(){
            assert.doesNotThrow(function(){
                require('../bin/www');
            }, Error);
        })
    })
});
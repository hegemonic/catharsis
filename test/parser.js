/*global describe: true, it: true */
'use strict';

var parse = require('../lib/parser').parse;
var should = require('should');


// each item in the 'types' array looks like:
// item[0]: {string} description
// item[1]: {string} type
// item[2]: {object} expected parsed type
function checkTypes(name) {
	var types = require('./specs/' + name);

	types.map(function(item) {
		var parsed;

		function parseIt() {
			parsed = parse(item[1]);
		}

		parseIt.should.not.throw();
		
		parsed.should.eql(item[2]);
	});
}

describe('parser', function() {
	describe('parse()', function() {
		// TODO: instead of listing each spec, we should read the specs directory and do a foreach()
		it('can parse basic types', function() {
			checkTypes('basic');
		});

		it('can parse type applications', function() {
			checkTypes('type-application');
		});

		it('can parse type unions', function() {
			checkTypes('type-union');
		});

		it('can parse record types', function() {
			checkTypes('record-type');
		});

		it('can parse nullable and non-nullable types', function() {
			checkTypes('nullable');
		});

		it('can parse function types', function() {
			checkTypes('function-type');
		});
	});
});

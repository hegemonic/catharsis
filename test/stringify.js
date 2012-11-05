/*global describe: true, it: true */
'use strict';

var parse = require('../lib/parser').parse;
var should = require('should');
var stringify = require('../lib/stringify');


// each item in the 'types' array looks like:
// item[0]: {string} description
// item[1]: {string} type
// item[2]: {object} expected parsed type
function checkStringifiedTypes(name) {
	var types = require('./specs/' + name);

	types.map(function(item) {
		var string;

		function stringifyIt() {
			string = stringify(item[2]);
			parse(string);
		}

		stringifyIt.should.not.throw();
		
		string.should.eql(item[1]);
	});
}

describe('stringify', function() {
	// TODO: instead of listing each spec, we should read the specs directory and do a foreach()
	it('can stringify basic types', function() {
		checkStringifiedTypes('basic');
	});

	it('can stringify type applications', function() {
		checkStringifiedTypes('type-application');
	});

	it('can stringify type unions', function() {
		checkStringifiedTypes('type-union');
	});

	it('can stringify record types', function() {
		checkStringifiedTypes('record-type');
	});

	it('can stringify nullable and non-nullable types', function() {
		checkStringifiedTypes('nullable');
	});

	it('can stringify function types', function() {
		checkStringifiedTypes('function-type');
	});
});

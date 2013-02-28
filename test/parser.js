/*global describe: true, it: true */
'use strict';

var parse = require('../lib/parser').parse;
var should = require('should');
var util = require('util');


function jsonify(obj) {
	return JSON.parse(JSON.stringify(obj));
}

// each item in the 'types' array looks like:
// item[0]: {string} description
// item[1]: {string} type
// item[2]: {object} expected parsed type
function checkTypes(name) {
	var types = require('./specs/' + name);

	types.map(function(item) {
		var parsed;

		function parseIt() {
			try {
				parsed = parse(item[1]);
			} catch(e) {
				throw new Error(util.format('unable to parse type expression "%s": %s', item[1],
					e.message));
			}
		}

		parseIt.should.not.throw();
		
		// TODO: investigate why some tests fail without the JSON round-trip
		jsonify(parsed).should.eql(jsonify(item[2]));
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

		it('can parse complex combinations of types', function() {
			checkTypes('combined');
		});
	});
});

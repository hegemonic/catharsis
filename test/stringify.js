/*global describe: true, it: true */
'use strict';

var helper = require('./helper');
var parse = require('../lib/parser').parse;
var path = require('path');
var should = require('should');
var stringify = require('../lib/stringify');
var util = require('util');


// each item looks like:
// item[0]: {string} description
// item[1]: {string} type
// item[2]: {object} expected parsed type
function stringifyIt(item) {
	var string = stringify(item[2]);
	if (string !== item[1]) {
		throw new Error(util.format('type expression "%s" was stringified as "%s"', item[1],
			string));
	}

	try {
		parse(string);
	} catch(e) {
		throw new Error(util.format('unable to parse string "%s", created from %j: %s', string,
			item[2], e.message));
	}
}

function checkStringifiedTypes(filepath) {
	var types = require(filepath);

	var errors = [];

	types.forEach(function(type) {
		try {
			stringifyIt(type);
		} catch(e) {
			errors.push(e.message);
		}
	});

	errors.should.eql([]);
}

describe('stringify', function() {
	var specs = './test/specs';

	function tester(specPath, basename) {
		it('can stringify types in the "' + basename + '" spec', function() {
			checkStringifiedTypes(path.join(specPath, basename));
		});
	}
	
	helper.testSpecs(specs, tester);
});

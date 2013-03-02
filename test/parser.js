/*global describe: true, it: true */
'use strict';

var _ = require('underscore');
var fs = require('fs');
var helper = require('./helper');
var parse = require('../lib/parser').parse;
var path = require('path');
var should = require('should');
var util = require('util');


function parseIt(item) {
	var parsed;

	try {
		parsed = parse(item[1]);
	} catch(e) {
		throw new Error(util.format('unable to parse type expression "%s": %s', item[1],
			e.message));
	}

	if (!_.isEqual(parsed, item[2])) {
		throw new Error(util.format('parse tree should be "%j", NOT "%j"', item[2], parsed));
	}
}

// each item in the 'types' array looks like:
// item[0]: {string} description
// item[1]: {string} type
// item[2]: {object} expected parsed type
function checkTypes(filepath) {
	var types = require(filepath);

	var errors = [];

	types.forEach(function(type) {
		try {
			parseIt(type);
		} catch(e) {
			errors.push(e.message);
		}
	});

	errors.should.eql([]);
}

describe('parser', function() {
	describe('parse()', function() {
		function tester(specPath, basename) {
			it('can parse types in the "' + basename + '" spec', function() {
				checkTypes(path.join(specPath, basename));
			});
		}
		
		helper.testSpecs(tester);
	});
});

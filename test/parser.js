/*global describe: true, it: true */
'use strict';

var _ = require('underscore');
var fs = require('fs');
var helper = require('./helper');
var parse = require('../lib/parser').parse;
var path = require('path');
var should = require('should');
var util = require('util');


function parseIt(item, options) {
	var parsed;

	try {
		parsed = parse(item.expression, options);
	} catch(e) {
		throw new Error(util.format('unable to parse type expression "%s": %s', item.expression,
			e.message));
	}

	if (!_.isEqual(parsed, item.parsed)) {
		throw new Error(util.format('parse tree should be "%j", NOT "%j"', item.parsed, parsed));
	}
}

function checkTypes(filepath, options) {
	var types = require(filepath);

	var errors = [];

	types.forEach(function(type) {
		try {
			parseIt(type, options);
		} catch(e) {
			errors.push(e.message);
		}
	});

	errors.should.eql([]);
}

describe('parser', function() {
	describe('parse()', function() {
		var specs = './test/specs';
		var lenientSpecs = path.join(specs, 'lenient');

		function tester(specPath, basename) {
			it('can parse types in the "' + basename + '" spec', function() {
				checkTypes(path.join(specPath, basename), {});
			});
		}

		function lenientTester(specPath, basename) {
			it('can parse types in the "' + basename + '" spec when in lenient mode', function() {
				checkTypes(path.join(specPath, basename), {lenient: true});
			});
		}
		
		helper.testSpecs(specs, tester);
		//helper.testSpecs(lenientSpecs, lenientTester);
	});
});

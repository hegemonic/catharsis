/*global describe: true, it: true */
'use strict';

var helper = require('./helper');
var parse = require('../lib/parser').parse;
var path = require('path');
var should = require('should');
var stringify = require('../lib/stringify');
var util = require('util');


function stringifyIt(item, options) {
	var string = stringify(item.parsed, options);
	var expression = item.newExpression || item.expression;
	if (string !== expression) {
		throw new Error(util.format('type expression "%s" was stringified as "%s"', expression,
			string));
	}

	if (options.validate === undefined || options.validate === true) {
		try {
			parse(string, options);
		} catch(e) {
			throw new Error(util.format('unable to parse string "%s", created from %j: %s', string,
				item.parsed, e.message));
		}
	}
}

function checkStringifiedTypes(filepath, options) {
	var types = require(filepath);

	var errors = [];

	types.forEach(function(type) {
		try {
			stringifyIt(type, options);
		} catch(e) {
			errors.push(e.message);
		}
	});

	errors.should.eql([]);
}

describe('stringify', function() {
	var specs = './test/specs';
	var htmlSpecs = './test/specs/html';

	function tester(specPath, basename, options) {
		it('can stringify types in the "' + basename + '" spec', function() {
			checkStringifiedTypes(path.join(specPath, basename), options);
		});
	}

	helper.testSpecs(specs, tester, {});
	helper.testSpecs(htmlSpecs, tester, {htmlSafe: true, validate: false});
});

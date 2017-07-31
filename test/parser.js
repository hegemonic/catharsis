/*global describe, it */
'use strict';

var _ = require('lodash');
var Ajv = require('ajv');
var fs = require('fs');
var helper = require('./helper');
var parse = require('../lib/parser').parse;
var path = require('path');
var schema = require('../lib/schema');
var should = require('should');
var util = require('util');

var ajv = new Ajv({
	allErrors: true,
	ownProperties: true
});
var validate = ajv.compile(schema);

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

	return parsed;
}

function checkTypes(filepath, options) {
	var types = require(filepath);

	var errors = [];
	var parsedType;
	var parsedTypes = [];
	var validationErrors = [];
	var validationResult;

	types.forEach(function(type) {
		try {
			parsedType = parseIt(type, options);
			validationResult = validate(parsedType);
			if (validationResult === false) {
				validationErrors.push({
					expression: type.expression,
					errors: validate.errors.slice(0)
				});
			}
		} catch(e) {
			errors.push(e.message);
		}
	});

	errors.should.eql([]);
	validationErrors.should.eql([]);
}

describe('parser', function() {
	describe('parse()', function() {
		var specs = './test/specs';
		var jsdocSpecs = path.join(specs, 'jsdoc');

		function tester(specPath, basename) {
			it('can parse types in the "' + basename + '" spec', function() {
				checkTypes(path.join(specPath, basename), {});
			});
		}

		function jsdocTester(specPath, basename) {
			it('can parse types in the "' + basename + '" spec when JSDoc type parsing is enabled',
				function() {
				checkTypes(path.join(specPath, basename), {jsdoc: true});
			});
		}

		helper.testSpecs(specs, tester);
		helper.testSpecs(jsdocSpecs, jsdocTester);
	});
});

/*global describe, it */
'use strict';

var _ = require('underscore-contrib');
var fs = require('fs');
var helper = require('./helper');
var parse = require('../lib/parser').parse;
var path = require('path');
var schema = require('../lib/schema');
var should = require('should');
var tv4 = require('tv4');
var util = require('util');
var validate = tv4.validateMultiple;

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
			validationResult = validate(parsedType, schema, { banUnknownProperties: true });
			if (validationResult.errors && validationResult.errors.length) {
				validationErrors.push({
					expression: type.expression,
					errors: validationResult.errors
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

		// register schema with the validator
		tv4.addSchema(schema.id, schema);

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

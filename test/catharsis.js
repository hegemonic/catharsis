/*global describe: true, it: true, xit: true */
'use strict';

var catharsis = require('../catharsis');
var should = require('should');
var Types = catharsis.Types;

var simpleType = 'foo';
var invalidType = '{*<?';
var simpleParsedType = {
	type: Types.NameExpression,
	name: 'string'
};
var invalidParsedType = {
	type: Types.NameExpression,
	applications: {},
	params: 'whatever'
};

describe('catharsis', function() {
	describe('parse()', function() {
		it('should exist', function() {
			should.exist(catharsis.parse);
		});

		it('should be a function', function() {
			catharsis.parse.should.be.a('function');
		});

		it('should return an object when given basic input', function() {
			catharsis.parse(simpleType).should.be.a('object');
		});

		it('should throw an error when given an invalid type', function() {
			function invalid() {
				catharsis.parse(invalidType);
			}

			invalid.should.throw();
		});

		xit('should use the appropriate cache', function() {
			// TODO: test normal and lenient mode
		});
	});

	describe('stringify()', function() {
		it('should exist', function() {
			should.exist(catharsis.stringify);
		});

		it('should be a function', function() {
			catharsis.stringify.should.be.a('function');
		});

		it('should return a string when given basic input', function() {
			catharsis.stringify(simpleParsedType).should.be.a('string');
		});

		it('should throw an error when given invalid input if validation is enabled', function() {
			function invalid() {
				catharsis.stringify(invalidParsedType, {validate: true});
			}

			invalid.should.throw();
		});

		it('should not throw an error when given invalid input if validation is disabled',
			function() {
				function invalid() {
					catharsis.stringify(invalidParsedType);
				}

				invalid.should.not.throw();
		});

		xit('should use the appropriate cache', function() {
			// TODO: test normal and lenient mode
		});
	});
});

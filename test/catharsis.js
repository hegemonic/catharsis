/*global describe: true, it: true */
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

		it('should return an object when given basic input', function(done) {
			catharsis.parse(simpleType, {}, function(error, obj) {
				should.not.exist(error);
				should.exist(obj);
				obj.should.be.a('object');
				done();
			});
		});

		it('should return an error when given an invalid type', function(done) {
			catharsis.parse(invalidType, {}, function(error) {
				should.exist(error);

				// now make sure the cache isn't somehow causing the error to be suppressed
				catharsis.parse(invalidType, {}, function(error) {
					should.exist(error);
					done();
				});
			});
		});
	});

	describe('parseSync()', function() {
		it('should exist', function() {
			should.exist(catharsis.parseSync);
		});

		it('should be a function', function() {
			catharsis.parseSync.should.be.a('function');
		});

		it('should return an object when given basic input', function() {
			catharsis.parseSync(simpleType).should.be.a('object');
		});

		it('should throw an error when given an invalid type', function() {
			function invalid() {
				catharsis.parseSync(invalidType);
			}
			
			invalid.should.throw();
		});
	});

	describe('stringify()', function() {
		it('should exist', function() {
			should.exist(catharsis.stringify);
		});

		it('should be a function', function() {
			catharsis.stringify.should.be.a('function');
		});

		it('should return a string when given basic input', function(done) {
			catharsis.stringify(simpleParsedType, {}, function(error, typeExpr) {
				should.not.exist(error);
				typeExpr.should.be.a('string');
				done();
			});
		});

		it('should return an error when given invalid input if validation is enabled',
			function(done) {
			catharsis.stringify(invalidParsedType, {validate: true}, function(error) {
				should.exist(error);
				done();
			});
		});
	});

	describe('stringifySync()', function() {
		it('should exist', function() {
			should.exist(catharsis.stringify);
		});

		it('should be a function', function() {
			catharsis.stringify.should.be.a('function');
		});

		it('should return a string when given basic input', function() {
			catharsis.stringifySync(simpleParsedType).should.be.a('string');
		});

		it('should throw an error when given invalid input if validation is enabled', function() {
			function invalid() {
				catharsis.stringifySync(invalidParsedType, {validate: true});
			}

			invalid.should.throw();
		});
	});
});

/*global describe: true, it: true, xit: true */
'use strict';

var catharsis = require('../catharsis');
var should = require('should');
var Types = catharsis.Types;

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
			catharsis.parse('foo').should.be.a('object');
		});

		it('should return a frozen object', function() {
			Object.isFrozen(catharsis.parse('foo')).should.equal(true);
		});

		it('should return an object with nonenumerable "typeExpression" and "lenient" properties',
			function() {
			var parsedType = catharsis.parse('foo');
			var descriptor;

			descriptor = Object.getOwnPropertyDescriptor(parsedType, 'typeExpression');
			descriptor.enumerable.should.equal(false);
			descriptor.value.should.equal('foo');

			descriptor = Object.getOwnPropertyDescriptor(parsedType, 'lenient');
			descriptor.enumerable.should.equal(false);
			descriptor.value.should.equal(false);
		});

		it('should throw an error when given an invalid type', function() {
			function invalid() {
				catharsis.parse(invalidType);
			}

			invalid.should.throw();
		});

		it('should use the regular cache when lenient mode is disabled', function() {
			// parse twice to make sure we're getting a cached version.
			// there must be a less lame way to do this...
			var bar = catharsis.parse('bar');
			bar = catharsis.parse('bar');

			bar.lenient.should.equal(false);	
		});

		it('should use the lenient cache when lenient mode is enabled', function() {
			// parse twice to make sure we're getting a cached version
			var baz = catharsis.parse('baz', {lenient: true});
			baz = catharsis.parse('baz', {lenient: true});

			baz.lenient.should.equal(true);
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

		it('should return the typeExpression property as-is if the cache is enabled', function() {
			var quxString = catharsis.stringify({
				type: Types.NameExpression,
				name: 'qux',
				typeExpression: 'fake type expression'
			});

			quxString.should.equal('fake type expression');
		});

		it('should not return the typeExpression property if the cache is disabled', function() {
			var quuxString = catharsis.stringify({
				type: Types.NameExpression,
				name: 'quux',
				typeExpression: 'fake type expression'
			},
			{
				useCache: false
			});

			quuxString.should.equal('quux');
		});
	});
});

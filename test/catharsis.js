/*global describe, it, xit */
/*eslint no-unused-expressions: 0 */
'use strict';

var catharsis = require('../catharsis');
var should = require('should');
var Types = catharsis.Types;

var invalidType = '{*<?';
var invalidRepeatableType = '!...string';
var simpleParsedType = {
	type: Types.NameExpression,
	name: 'string'
};
var invalidParsedType = {
	type: Types.NameExpression,
	applications: {},
	params: 'whatever'
};
var nullParsedType = {
	type: Types.NullLiteral
};

function dummyResources() {
	return {
		modifiers: {
			extended: {
				prefix: '',
				suffix: ''
			},
			simple: {
				prefix: '',
				suffix: ''
			}
		},
		type: '<%= type %>'
	};
}

describe('catharsis', function() {
	describe('parse()', function() {
		it('should exist', function() {
			should.exist(catharsis.parse);
		});

		it('should be a function', function() {
			catharsis.parse.should.be.a.Function;
		});

		it('should return an object when given basic input', function() {
			catharsis.parse('foo').should.be.an.Object;
		});

		it('should return a frozen object', function() {
			Object.isFrozen(catharsis.parse('foo')).should.equal(true);
		});

		it('should only return its own properties', function() {
			catharsis.parse('constructor').should.be.an.Object;
		});

		it('should return an object with nonenumerable "typeExpression" and "jsdoc" properties',
			function() {
			var parsedType = catharsis.parse('foo');
			var descriptor;

			descriptor = Object.getOwnPropertyDescriptor(parsedType, 'typeExpression');
			descriptor.enumerable.should.equal(false);
			descriptor.value.should.equal('foo');

			descriptor = Object.getOwnPropertyDescriptor(parsedType, 'jsdoc');
			descriptor.enumerable.should.equal(false);
			descriptor.value.should.equal(false);
		});

		it('should throw an error when given an invalid type', function() {
			function invalid() {
				catharsis.parse(invalidType);
			}

			invalid.should.throw();
		});

		it('should throw an error when given an invalid repeatable type', function() {
			function invalid() {
				catharsis.parse(invalidRepeatableType);
			}

			invalid.should.throw();
		});

		it('should pass the specified options to the parser', function() {
			function jsdoc() {
				catharsis.parse('number|string', {jsdoc: true});
			}

			jsdoc.should.not.throw();
		});

		it('should use the regular cache when JSDoc mode is disabled', function() {
			// parse twice to make sure we're getting a cached version
			var bar = catharsis.parse('bar');
			bar = catharsis.parse('bar');

			bar.jsdoc.should.equal(false);
		});

		it('should use the JSDoc cache when JSDoc mode is enabled', function() {
			// parse twice to make sure we're getting a cached version
			var baz = catharsis.parse('baz', {jsdoc: true});
			baz = catharsis.parse('baz', {jsdoc: true});

			baz.jsdoc.should.equal(true);
		});

		it('should strip newlines before parsing a type expression', function() {
			var parsed = catharsis.parse('My\rNew\nClass\r\n');
			parsed.name.should.equal('MyNewClass');
		});
	});

	describe('stringify()', function() {
		it('should exist', function() {
			should.exist(catharsis.stringify);
		});

		it('should be a function', function() {
			catharsis.stringify.should.be.a.Function;
		});

		it('should return a string when given basic input', function() {
			catharsis.stringify(simpleParsedType).should.be.a.String;
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

		it('should return the typeExpression property as-is by default', function() {
			var quxString = catharsis.stringify({
				type: Types.NameExpression,
				name: 'qux',
				typeExpression: 'fake type expression'
			});

			quxString.should.equal('fake type expression');
		});

		it('should not return the typeExpression property if restringification is requested',
			function() {
			var quuxString = catharsis.stringify({
				type: Types.NameExpression,
				name: 'quux',
				typeExpression: 'fake type expression'
			},
			{
				restringify: true
			});

			quuxString.should.equal('quux');
		});

		it('should not return the typeExpression property if htmlSafe is enabled', function() {
			var typeAppString = catharsis.stringify({
				type: Types.TypeApplication,
				expression: {
					type: Types.NameExpression,
					name: 'Array'
				},
				applications: [
					{
						type: Types.NameExpression,
						name: 'boolean'
					}
				],
				typeExpression: 'Array.<boolean>'
			},
			{
				htmlSafe: true
			});

			typeAppString.should.equal('Array.&lt;boolean>');
		});

		it('should not return the typeExpression property if the links option is provided',
			function() {
			var typeAppString = catharsis.stringify({
				type: Types.NameExpression,
				name: 'string',
				typeExpression: 'fake type expression'
			},
			{
				links: {}
			});

			typeAppString.should.equal('string');
		});

		// used for multiple tests
		var typeApp = {
			type: Types.TypeApplication,
			expression: {
				type: Types.NameExpression,
				name: 'Array'
			},
			applications: [
				{
					type: Types.NameExpression,
					name: 'string'
				}
			]
		};

		it('should pass the specified options to the stringifier', function() {
			var string = catharsis.stringify(typeApp, {htmlSafe: true});

			string.should.equal('Array.&lt;string>');
		});

		it('should not cache an HTML-safe expression, then return it when the htmlSafe option ' +
			'is disabled', function() {
			var string = catharsis.stringify(typeApp, {});

			string.should.equal('Array.<string>');
		});
	});

	describe('describe()', function() {
		it('should exist', function() {
			should.exist(catharsis.describe);
		});

		it('should be a function', function() {
			catharsis.describe.should.be.a.Function;
		});

		it('should return an object when given basic input', function() {
			catharsis.describe(simpleParsedType).should.be.an.Object;
		});

		it('should return a frozen object', function() {
			Object.isFrozen(catharsis.describe(simpleParsedType)).should.equal(true);
		});

		it('should return an object with a nonenumerable "jsdoc" property', function() {
			var description = catharsis.describe(simpleParsedType);
			var descriptor = Object.getOwnPropertyDescriptor(description, 'jsdoc');

			descriptor.enumerable.should.equal(false);
			descriptor.value.should.equal(false);
		});

		it('should throw an error when given bad input', function() {
			function badInput() {
				catharsis.describe(invalidType);
			}

			badInput.should.throw();
		});

		it('should use options.language and options.resources when provided', function() {
			var description;
			var language = 'de';
			var nullString = 'nichtig';
			var options = {
				language: language,
				resources: {
					de: dummyResources()
				}
			};

			options.resources.de.null = nullString;

			description = catharsis.describe(nullParsedType, options);
			description.simple.should.equal(nullString);
			description.extended.description.should.equal(nullString);
		});

		it('should throw an error when a language with no resources is specified', function() {
			function noResources() {
				catharsis.describe(nullParsedType, {language: 'qq'});
			}

			noResources.should.throw();
		});
	});
});

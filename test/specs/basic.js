'use strict';

var Types = require('../../lib/types');

module.exports = [
	{
		description: 'boolean',
		expression: 'boolean',
		parsed: {
			type: Types.NameExpression,
			name: 'boolean'
		}
	},
	{
		description: 'object',
		expression: 'Window',
		parsed: {
			type: Types.NameExpression,
			name: 'Window'
		}
	},
	{
		description: 'object with properties',
		expression: 'goog.ui.Menu',
		parsed: {
			type: Types.NameExpression,
			name: 'goog.ui.Menu'
		}
	},
	{
		description: 'object with a single-quoted string-literal property',
		expression: "myObj.'myProp'.foo",
		parsed: {
			type: Types.NameExpression,
			name: "myObj.'myProp'.foo"
		}
	},
	{
		description: 'object with a double-quoted string-literal property',
		expression: 'myObj."myProp".foo',
		parsed: {
			type: Types.NameExpression,
			name: 'myObj."myProp".foo'
		}
	},
	{
		description: 'object with a string-literal property that includes other punctuation',
		expression: 'myObj."#weirdProp".foo',
		parsed: {
			type: Types.NameExpression,
			name: 'myObj."#weirdProp".foo'
		}
	},
	{
		description: 'object with a numeric property',
		expression: 'myObj.12345',
		parsed: {
			type: Types.NameExpression,
			name: 'myObj.12345'
		}
	},
	{
		description: 'variable number of parameters',
		expression: '...number',
		parsed: {
			type: Types.NameExpression,
			name: 'number',
			repeatable: true
		}
	},
	{
		description: 'optional number parameter',
		expression: 'number=',
		parsed: {
			type: Types.NameExpression,
			name: 'number',
			optional: true
		}
	},
	{
		description: 'optional Object parameter',
		expression: 'Object=',
		parsed: {
			type: Types.NameExpression,
			name: 'Object',
			optional: true
		}
	},
	{
		description: 'null',
		expression: 'null',
		parsed: {
			type: Types.NullLiteral
		}
	},
	{
		description: 'repeatable null',
		expression: '...null',
		parsed: {
			type: Types.NullLiteral,
			repeatable: true
		}
	},
	{
		description: 'undefined',
		expression: 'undefined',
		parsed: {
			type: Types.UndefinedLiteral
		}
	},
	{
		description: 'repeatable undefined',
		expression: '...undefined',
		parsed: {
			type: Types.UndefinedLiteral,
			repeatable: true
		}
	},
	{
		description: 'all',
		expression: '*',
		parsed: {
			type: Types.AllLiteral
		}
	},
	{
		description: 'repeatable all',
		expression: '...*',
		parsed: {
			type: Types.AllLiteral,
			repeatable: true
		}
	},
	{
		description: 'unknown',
		expression: '?',
		parsed: {
			type: Types.UnknownLiteral
		}
	},
	{
		description: 'repeatable unknown',
		expression: '...?',
		parsed: {
			type: Types.UnknownLiteral,
			repeatable: true
		}
	},
	{
		description: 'name that starts with a reserved word',
		expression: 'forsooth',
		parsed: {
			type: Types.NameExpression,
			name: 'forsooth'
		}
	},
	{
		description: 'name that includes a hyphen and a numeral',
		expression: 'My-1st-Class',
		parsed: {
			type: Types.NameExpression,
			name: 'My-1st-Class'
		}
	}
];

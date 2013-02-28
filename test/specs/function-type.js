'use strict';

var Types = require('../../lib/types');

module.exports = [
	[
		'function with two basic parameters',
		'function(string, boolean)',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'string'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			]
		}
	],
	[
		'optional function with one basic parameter',
		'function(string)=',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'string'
				}
			],
			optional: true
		}
	],
	[
		'function with no parameters and a return value',
		'function(): number',
		{
			type: Types.FunctionType,
			params: [],
			result: {
				type: Types.NameExpression,
				name: 'number'
			}
		}
	],
	[
		'function with a "this" type and one parameter',
		'function(this:goog.ui.Menu, string)',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'string'
				}
			],
			'this': {
				type: Types.NameExpression,
				name: 'goog.ui.Menu'
			}
		}
	],
	[
		'function with a "new" type and one parameter',
		'function(new:goog.ui.Menu, string)',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'string'
				}
			],
			'new': {
				type: Types.NameExpression,
				name: 'goog.ui.Menu'
			}
		}
	],
	[
		'function with a variable number of parameters and a return value',
		'function(string, ...[number]): number',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'string'
				},
				{
					type: Types.NameExpression,
					name: 'number',
					repeatable: true
				}
			],
			result: {
				type: Types.NameExpression,
				name: 'number'
			}
		}
	],
	[
		'function with a variable number of parameters, a "new" type, a "this" type, and a ' +
			'return value',
		'function(new:Master, this:Everyone, string, goog.ui.Menu, Array.<Object>, ...[string]): ' +
			'boolean',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'string'
				},
				{
					type: Types.NameExpression,
					name: 'goog.ui.Menu'
				},
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Array'
					},
					applications: [
						{
							type: Types.NameExpression,
							name: 'Object'
						}
					]
				},
				{
					type: Types.NameExpression,
					name: 'string',
					repeatable: true
				}
			],
			'new': {
				type: Types.NameExpression,
				name: 'Master'
			},
			'this': {
				type: Types.NameExpression,
				name: 'Everyone'
			},
			result: {
				type: Types.NameExpression,
				name: 'boolean'
			}
		}
	]
];

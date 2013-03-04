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
		'function with two basic parameters and a return value',
		'function(string, string): boolean',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'string'
				},
				{
					type: Types.NameExpression,
					name: 'string'
				}
			],
			result: {
				type: Types.NameExpression,
				name: 'boolean'
			}
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
		'function with a fixed parameter, followed by a variable number of parameters, as well ' +
			'as a return value',
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
		'function with a variable number of parameters containing the value `null`',
		'function(...[null])',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NullLiteral,
					repeatable: true
				}
			]
		}
	],
	[
		'function with a variable number of parameters containing the value `undefined`',
		'function(...[undefined])',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.UndefinedLiteral,
					repeatable: true
				}
			]
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
	],

	// The following type expressions are adapted from the Closure Compiler test suite:
	// http://goo.gl/rgKSk
	[
		'function that returns a type union',
		'function(): (number|string)',
		{
			type: Types.FunctionType,
			params: [],
			result: {
				type: Types.UnionType,
				elements: [
					{
						type: Types.NameExpression,
						name: 'number'
					},
					{
						type: Types.NameExpression,
						name: 'string'
					}
				]
			}
		}
	],
	[
		'function with no parameters and no return value',
		'function()',
		{
			type: Types.FunctionType,
			params: []
		}
	],
	[
		'function with a variable number of parameters containing any values',
		'function(...[*])',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.AllLiteral,
					repeatable: true
				}
			]
		}
	],
	[
		'function with a "this" type that returns a type union',
		'function(this:Object): (number|string)',
		{
			type: Types.FunctionType,
			params: [],
			'this': {
				type: Types.NameExpression,
				name: 'Object'
			},
			result: {
				type: Types.UnionType,
				elements: [
					{
						type: Types.NameExpression,
						name: 'number'
					},
					{
						type: Types.NameExpression,
						name: 'string'
					}
				]
			}
		}
	],
	[
		'function with a "this" type that is a type union, and that returns a type union',
		'function(this:(Array|Date)): (number|string)',
		{
			type: Types.FunctionType,
			params: [],
			'this': {
				type: Types.UnionType,
				elements: [
					{
						type: Types.NameExpression,
						name: 'Array'
					},
					{
						type: Types.NameExpression,
						name: 'Date'
					}
				]
			},
			result: {
				type: Types.UnionType,
				elements: [
					{
						type: Types.NameExpression,
						name: 'number'
					},
					{
						type: Types.NameExpression,
						name: 'string'
					}
				]
			}
		}
	],
	[
		'function with a "new" type and a variable number of params that accept all types, ' +
			'returning a name expression',
		'function(new:Array, ...[*]): Array',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.AllLiteral,
					repeatable: true
				}
			],
			'new': {
				type: Types.NameExpression,
				name: 'Array'
			},
			result: {
				type: Types.NameExpression,
				name: 'Array'
			}
		}
	],
	[
		'function with a "new" type that accepts an optional parameter of any type, as well as a ' +
			'return value',
		'function(new:Boolean, *=): boolean',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.AllLiteral,
					optional: true
				}
			],
			'new': {
				type: Types.NameExpression,
				name: 'Boolean'
			},
			result: {
				type: Types.NameExpression,
				name: 'boolean'
			}
		}
	],
	[
		'function with a variable number of parameters and a return value',
		'function(...[number]): boolean',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'number',
					repeatable: true
				}
			],
			result: {
				type: Types.NameExpression,
				name: 'boolean'
			}
		}
	],
	[
		'function with a "this" type and a parameter that returns a type union',
		'function(this:Date, number): (boolean|number|string)',
		{
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'number'
				}
			],
			'this': {
				type: Types.NameExpression,
				name: 'Date'
			},
			result: {
				type: Types.UnionType,
				elements: [
					{
						type: Types.NameExpression,
						name: 'boolean'
					},
					{
						type: Types.NameExpression,
						name: 'number'
					},
					{
						type: Types.NameExpression,
						name: 'string'
					}
				]
			}
		}
	]
];

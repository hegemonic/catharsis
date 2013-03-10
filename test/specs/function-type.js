'use strict';

var Types = require('../../lib/types');

module.exports = [
	{
		description: 'function with two basic parameters',
		expression: 'function(string, boolean)',
		parsed: {
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
	},
	{
		description: 'function with two basic parameters and a return value',
		expression: 'function(string, string): boolean',
		parsed: {
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
	},
	{
		description: 'optional function with one basic parameter',
		expression: 'function(string)=',
		parsed: {
			type: Types.FunctionType,
			params: [
				{
					type: Types.NameExpression,
					name: 'string'
				}
			],
			optional: true
		}
	},
	{
		description: 'function with no parameters and a return value',
		expression: 'function(): number',
		parsed: {
			type: Types.FunctionType,
			params: [],
			result: {
				type: Types.NameExpression,
				name: 'number'
			}
		}
	},
	{
		description: 'function with a "this" type and one parameter',
		expression: 'function(this:goog.ui.Menu, string)',
		parsed: {
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
	},
	{
		description: 'function with a "new" type and one parameter',
		expression: 'function(new:goog.ui.Menu, string)',
		parsed: {
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
	},
	{
		description: 'function with a fixed parameter, followed by a variable number of ' +
			'parameters, as well as a return value',
		expression: 'function(string, ...[number]): number',
		parsed: {
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
	},
	{
		description: 'function with a variable number of parameters containing the value `null`',
		expression: 'function(...[null])',
		parsed: {
			type: Types.FunctionType,
			params: [
				{
					type: Types.NullLiteral,
					repeatable: true
				}
			]
		}
	},
	{
		description: 'function with a variable number of parameters containing the value ' +
			'`undefined`',
		expression: 'function(...[undefined])',
		parsed: {
			type: Types.FunctionType,
			params: [
				{
					type: Types.UndefinedLiteral,
					repeatable: true
				}
			]
		}
	},
	{
		description: 'function with a variable number of parameters, a "new" type, a "this" ' +
			'type, and a return value',
		expression: 'function(new:Master, this:Everyone, string, goog.ui.Menu, Array.<Object>, ' +
			'...[string]): boolean',
		parsed: {
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
	},

	// The following type expressions are adapted from the Closure Compiler test suite:
	// http://goo.gl/rgKSk
	{
		description: 'function that returns a type union',
		expression: 'function(): (number|string)',
		parsed: {
			type: Types.FunctionType,
			params: [],
			result: {
				type: Types.TypeUnion,
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
	},
	{
		description: 'function with no parameters and no return value',
		expression: 'function()',
		parsed: {
			type: Types.FunctionType,
			params: []
		}
	},
	{
		description: 'function with a variable number of parameters containing any values',
		expression: 'function(...[*])',
		parsed: {
			type: Types.FunctionType,
			params: [
				{
					type: Types.AllLiteral,
					repeatable: true
				}
			]
		}
	},
	{
		description: 'function with a "this" type that returns a type union',
		expression: 'function(this:Object): (number|string)',
		parsed: {
			type: Types.FunctionType,
			params: [],
			'this': {
				type: Types.NameExpression,
				name: 'Object'
			},
			result: {
				type: Types.TypeUnion,
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
	},
	{
		description: 'function with a "this" type that is a type union, and that returns a ' +
			'type union',
		expression: 'function(this:(Array|Date)): (number|string)',
		parsed: {
			type: Types.FunctionType,
			params: [],
			'this': {
				type: Types.TypeUnion,
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
				type: Types.TypeUnion,
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
	},
	{
		description: 'function with a "new" type and a variable number of params that accept ' +
			'all types, returning a name expression',
		expression: 'function(new:Array, ...[*]): Array',
		parsed: {
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
	},
	{
		description: 'function with a "new" type that accepts an optional parameter of any ' +
			'type, as well as a return value',
		expression: 'function(new:Boolean, *=): boolean',
		parsed: {
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
	},
	{
		description: 'function with a variable number of parameters and a return value',
		expression: 'function(...[number]): boolean',
		parsed: {
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
	},
	{
		description: 'function with a "this" type and a parameter that returns a type union',
		expression: 'function(this:Date, number): (boolean|number|string)',
		parsed: {
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
				type: Types.TypeUnion,
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
	}
];

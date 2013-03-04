'use strict';

var Types = require('../../lib/types');

module.exports = [
	[
		'union with 2 types (number and boolean)',
		'(number|boolean)',
		{
			type: Types.UnionType,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			]
		}
	],
	[
		'union with 2 types (Object and undefined)',
		'(Object|undefined)',
		{
			type: Types.UnionType,
			elements: [
				{
					type: Types.NameExpression,
					name: 'Object'
				},
				{
					type: Types.UndefinedLiteral
				}
			]
		}
	],
	[
		'union with 3 types (number, Window, and goog.ui.Menu)',
		'(number|Window|goog.ui.Menu)',
		{
			type: Types.UnionType,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'Window'
				},
				{
					type: Types.NameExpression,
					name: 'goog.ui.Menu'
				}
			]
		}
	],
	[
		'nullable union with 2 types (number and boolean)',
		'?(number|boolean)',
		{
			type: Types.UnionType,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			],
			nullable: true
		}
	],
	[
		'non-nullable union with 2 types (number and boolean)',
		'!(number|boolean)',
		{
			type: Types.UnionType,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			],
			nullable: false
		}
	],
	[
		'optional union with 2 types (number and boolean)',
		'(number|boolean)=',
		{
			type: Types.UnionType,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			],
			optional: true
		}
	],

	// The following type expressions are adapted from the Closure Compiler test suite:
	// http://goo.gl/vpRTe, http://goo.gl/DVh3f
	[
		'union with 2 types (array and object with unknown value type)',
		'(Array|Object.<string, ?>)',
		{
			type: Types.UnionType,
			elements: [
				{
					type: Types.NameExpression,
					name: 'Array'
				},
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Object'
					},
					applications: [
						{
							type: Types.NameExpression,
							name: 'string'
						},
						{
							type: Types.UnknownLiteral
						}
					]
				}
			]
		}
	],
	[
		'union with 2 type applications',
		'(Array.<string>|Object.<string, ?>)',
		{
			type: Types.UnionType,
			elements: [
				{
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
				},
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Object'
					},
					applications: [
						{
							type: Types.NameExpression,
							name: 'string'
						},
						{
							type: Types.UnknownLiteral
						}
					]
				}
			]
		}
	],
	[
		'union with 2 types (an error, or a function that returns an error)',
		'(Error|function(): Error)',
		{
			type: Types.UnionType,
			elements: [
				{
					type: Types.NameExpression,
					name: 'Error'
				},
				{
					type: Types.FunctionType,
					params: [],
					result: {
						type: Types.NameExpression,
						name: 'Error'
					}
				}
			]
		}
	]
];

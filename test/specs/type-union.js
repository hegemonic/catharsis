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
	]
];

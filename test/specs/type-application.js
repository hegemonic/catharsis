'use strict';

var Types = require('../../lib/types');

module.exports = [
	[
		'array of strings',
		'Array.<string>',
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
		}
	],
	[
		'object whose properties are strings and property values are numbers',
		'Object.<string, number>',
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
					type: Types.NameExpression,
					name: 'number'
				}
			]
		}
	],
	[
		'array of objects that have a length property',
		'Array.<{length}>',
		{
			type: Types.TypeApplication,
			expression: {
				type: Types.NameExpression,
				name: 'Array'
			},
			applications: [
				{
					type: Types.RecordType,
					fields: [
						{
							type: Types.FieldType,
							key: 'length',
							value: undefined
						}
					]
				}
			]
		}
	]
];

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
		'object whose properties are a type application and property values are a type union',
		'Object.<Array.<(boolean|{myKey: Error})>, (boolean|string|function(new:foo): string)>',
		{
			type: Types.TypeApplication,
			expression: {
				type: Types.NameExpression,
				name: 'Object'
			},
			applications: [
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Array'
					},
					applications: [
						{
							type: Types.UnionType,
							elements: [
								{
									type: Types.NameExpression,
									name: 'boolean'
								},
								{
									type: Types.RecordType,
									fields: [
										{
											type: Types.FieldType,
											key: {
												type: Types.NameExpression,
												name: 'myKey'
											},
											value: {
												type: Types.NameExpression,
												name: 'Error'
											}
										}
									]
								}
							]
						}
					]
				},
				{
					type: Types.UnionType,
					elements: [
						{
							type: Types.NameExpression,
							name: 'boolean'
						},
						{
							type: Types.NameExpression,
							name: 'string'
						},
						{
							type: Types.FunctionType,
							params: [],
							'new': {
								type: Types.NameExpression,
								name: 'foo'
							},
							result: {
								type: Types.NameExpression,
								name: 'string'
							}
						}
					]
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
							key: {
								type: Types.NameExpression,
								name: 'length'
							},
							value: undefined
						}
					]
				}
			]
		}
	],
	[
		'array of unknown type',
		'Array.<?>',
		{
			type: Types.TypeApplication,
			expression: {
				type: Types.NameExpression,
				name: 'Array'
			},
			applications: [
				{
					type: Types.UnknownLiteral
				}
			]
		}
	]
];

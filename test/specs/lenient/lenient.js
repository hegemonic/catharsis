'use strict';

var Types = require('../../../lib/types');

module.exports = [
	{
		description: 'name expression with instance scope punctuation',
		expression: 'MyClass#myMember',
		parsed: {
			type: Types.NameExpression,
			name: 'MyClass#myMember'
		}
	},
	{
		description: 'name expression with inner scope punctuation',
		expression: 'MyClass~myMember',
		parsed: {
			type: Types.NameExpression,
			name: 'MyClass~myMember'
		}
	},
	{
		description: 'name expression with instance and inner scope punctuation',
		expression: 'MyClass#myMember#yourMember~theirMember',
		parsed: {
			type: Types.NameExpression,
			name: 'MyClass#myMember#yourMember~theirMember'
		}
	},
	{
		description: 'type application with no period',
		expression: 'Array<string>',
		newExpression: 'Array.<string>',
		parsed: {
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
	},
	{
		description: 'type union with no enclosing parentheses',
		expression: 'number|string',
		newExpression: '(number|string)',
		parsed: {
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
	},
	{
		description: 'record type with a property that uses a type application as a key',
		expression: '{Array.<string>: number}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
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
					value: {
						type: Types.NameExpression,
						name: 'number'
					}
				}
			]
		}
	},
	{
		description: 'record type with a property that uses a type union as a key',
		expression: '{(number|boolean|string): number}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.TypeUnion,
						elements: [
							{
								type: Types.NameExpression,
								name: 'number'
							},
							{
								type: Types.NameExpression,
								name: 'boolean'
							},
							{
								type: Types.NameExpression,
								name: 'string'
							}
						]
					},
					value: {
						type: Types.NameExpression,
						name: 'number'
					}
				}
			]
		}
	},
	{
		description: 'function type with no trailing pathentheses',
		expression: 'function',
		newExpression: 'function()',
		parsed: {
			type: Types.FunctionType,
			params: []
		}
	}
];

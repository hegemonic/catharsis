'use strict';

var Types = require('../../lib/types');

module.exports = [
	{
		description: 'empty record type',
		expression: '{}',
		parsed: {
			type: Types.RecordType,
			fields: []
		}
	},
	{
		description: 'record type with 1 typed property',
		expression: '{myNum: number}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'myNum'
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
		description: 'optional record type with 1 typed property',
		expression: '{myNum: number}=',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'myNum'
					},
					value: {
						type: Types.NameExpression,
						name: 'number'
					}
				}
			],
			optional: true
		}
	},
	{
		description: 'nullable record type with 1 typed property',
		expression: '?{myNum: number}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'myNum'
					},
					value: {
						type: Types.NameExpression,
						name: 'number'
					}
				}
			],
			nullable: true
		}
	},
	{
		description: 'non-nullable record type with 1 typed property',
		expression: '!{myNum: number}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'myNum'
					},
					value: {
						type: Types.NameExpression,
						name: 'number'
					}
				}
			],
			nullable: false
		}
	},
	{
		description: 'record type with 1 typed property and 1 untyped property',
		expression: '{myNum: number, myObject}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'myNum'
					},
					value: {
						type: Types.NameExpression,
						name: 'number'
					}
				},
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'myObject'
					},
					value: undefined
				}
			]
		}
	},
	{
		description: 'record type with a property that uses a type application as a value',
		expression: '{myArray: Array.<string>}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'myArray'
					},
					value: {
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
				}
			]
		}
	},
	{
		description: 'record type with a property that uses a type union as a value',
		expression: '{myKey: (number|boolean|string)}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'myKey'
					},
					value: {
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
					}
				}
			]
		}
	},
	{
		description: 'record type with a property that uses a JavaScript keyword as a key',
		expression: '{continue: string}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'continue',
						reservedWord: true
					},
					value: {
						type: Types.NameExpression,
						name: 'string'
					}
				}
			]
		}
	},
	{
		description: 'record type with a property that uses a JavaScript future reserved word as ' +
			'a key',
		expression: '{class: string}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'class',
						reservedWord: true
					},
					value: {
						type: Types.NameExpression,
						name: 'string'
					}
				}
			]
		}
	},
	{
		description: 'record type with a property that uses a string representation of a ' +
			'JavaScript boolean literal as a key',
		expression: '{true: string}',
		parsed: {
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.NameExpression,
						name: 'true',
						reservedWord: true
					},
					value: {
						type: Types.NameExpression,
						name: 'string'
					}
				}
			]
		}
	}
];

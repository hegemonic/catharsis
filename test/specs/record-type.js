'use strict';

var Types = require('../../lib/types');

module.exports = [
	[
		'empty record type',
		'{}',
		{
			type: Types.RecordType,
			fields: []
		}
	],
	[
		'record type with 1 typed property',
		'{myNum: number}',
		{
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
	],
	[
		'optional record type with 1 typed property',
		'{myNum: number}=',
		{
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
	],
	[
		'nullable record type with 1 typed property',
		'?{myNum: number}',
		{
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
	],
	[
		'non-nullable record type with 1 typed property',
		'!{myNum: number}',
		{
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
	],
	[
		'record type with 1 typed property and 1 untyped property',
		'{myNum: number, myObject}',
		{
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
	],
	[
		'record type with a property that uses a type application as a key',
		'{Array.<string>: number}',
		{
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
	],
	[
		'record type with a property that uses a type application as a value',
		'{myArray: Array.<string>}',
		{
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
	],
	[
		'record type with a property that uses a type union as a key',
		'{(number|boolean|string): number}',
		{
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: {
						type: Types.UnionType,
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
	],
	[
		'record type with a property that uses a type union as a value',
		'{myKey: (number|boolean|string)}',
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
						type: Types.UnionType,
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
	],
	[
		'record type with a property that uses a JavaScript keyword as a key',
		'{continue: string}',
		{
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
	],
	[
		'record type with a property that uses a JavaScript future reserved word as a key',
		'{class: string}',
		{
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
	],
	[
		'record type with a property that uses a string representation of a JavaScript boolean ' +
			'literal as a key',
		'{true: string}',
		{
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
	]
];

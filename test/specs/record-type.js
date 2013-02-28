'use strict';

var Types = require('../../lib/types');

module.exports = [
	[
		'record type with 1 typed property',
		'{myNum: number}',
		{
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: 'myNum',
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
					key: 'myNum',
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
		'record type with 1 typed property and 1 untyped property',
		'{myNum: number, myObject}',
		{
			type: Types.RecordType,
			fields: [
				{
					type: Types.FieldType,
					key: 'myNum',
					value: {
						type: Types.NameExpression,
						name: 'number'
					}
				},
				{
					type: Types.FieldType,
					key: 'myObject',
					value: undefined
				}
			]
		}
	]
];

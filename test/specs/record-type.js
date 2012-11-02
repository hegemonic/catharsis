'use strict';

module.exports = [
	[
		'record type with 1 typed property',
		'{myNum: number}',
		{
			typeName: 'object',
			properties: [
				{
					name: 'myNum',
					typeName: 'number'
				}
			]
		}
	],
	[
		'record type with 1 typed property and 1 untyped property',
		'{myNum: number, myObject}',
		{
			typeName: 'object',
			properties: [
				{
					name: 'myNum',
					typeName: 'number'
				},
				{
					name: 'myObject',
					typeName: undefined
				}
			]
		}
	]
];

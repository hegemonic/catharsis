'use strict';

module.exports = [
	[
		'union with 2 types (number and boolean)',
		'(number|boolean)',
		{
			union: [
				{
					typeName: 'number'
				},
				{
					typeName: 'boolean'
				}
			]
		}
	],
	[
		'union with 2 types (Object and undefined)',
		'(Object|undefined)',
		{
			union: [
				{
					typeName: 'Object'
				},
				{
					typeName: 'undefined'
				}
			]
		}
	],
	[
		'union with 3 types (number, Window, and goog.ui.Menu)',
		'(number|Window|goog.ui.Menu)',
		{
			union: [
				{
					typeName: 'number'
				},
				{
					typeName: 'Window'
				},
				{
					typeName: 'goog.ui.Menu'
				}
			]
		}
	],
	[
		'nullable union with 2 types (number and boolean)',
		'?(number|boolean)',
		{
			union: [
				{
					typeName: 'number'
				},
				{
					typeName: 'boolean'
				}
			],
			nullable: true
		}
	],
	[
		'non-nullable union with 2 types (number and boolean)',
		'!(number|boolean)',
		{
			union: [
				{
					typeName: 'number'
				},
				{
					typeName: 'boolean'
				}
			],
			nullable: false
		}
	],
	[
		'optional union with 2 types (number and boolean)',
		'(number|boolean)=',
		{
			union: [
				{
					typeName: 'number'
				},
				{
					typeName: 'boolean'
				}
			],
			optional: true
		}
	]
];

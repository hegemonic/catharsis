'use strict';

module.exports = [
	[
		'number or null',
		'?number',
		{
			typeName: 'number',
			nullable: true
		}
	],
	[
		'object, not null',
		'!Object',
		{
			typeName: 'Object',
			nullable: false
		}
	]
];
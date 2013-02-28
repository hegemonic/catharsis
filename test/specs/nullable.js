'use strict';

var Types = require('../../lib/types');

module.exports = [
	[
		'number or null',
		'?number',
		{
			type: Types.NameExpression,
			name: 'number',
			nullable: true
		}
	],
	[
		'object, not null',
		'!Object',
		{
			type: Types.NameExpression,
			name: 'Object',
			nullable: false
		}
	]
];
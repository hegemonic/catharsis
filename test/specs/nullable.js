'use strict';

var Types = require('../../lib/types');

module.exports = [
	{
		description: 'number or null',
		expression: '?number',
		parsed: {
			type: Types.NameExpression,
			name: 'number',
			nullable: true
		}
	},
	{
		description: 'object, not null',
		expression: '!Object',
		parsed: {
			type: Types.NameExpression,
			name: 'Object',
			nullable: false
		}
	}
];
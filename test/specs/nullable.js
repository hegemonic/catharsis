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
		description: 'postfix number or null',
		expression: 'number?',
		newExpression: '?number',
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
	},
	{
		description: 'postfix object, not null',
		expression: 'Object!',
		newExpression: '!Object',
		parsed: {
			type: Types.NameExpression,
			name: 'Object',
			nullable: false
		}
	}
];
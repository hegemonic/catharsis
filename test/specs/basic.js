'use strict';

var Types = require('../../lib/types');

module.exports = [
	[
		'boolean',
		'boolean',
		{
			type: Types.NameExpression,
			name: 'boolean'
		}
	],
	[
		'object',
		'Window',
		{
			type: Types.NameExpression,
			name: 'Window'
		}
	],
	[
		'object with properties',
		'goog.ui.Menu',
		{
			type: Types.NameExpression,
			name: 'goog.ui.Menu'
		}
	],
	[
		'variable number of parameters',
		'...number',
		{
			type: Types.NameExpression,
			name: 'number',
			repeatable: true
		}
	],
	[
		'optional number parameter',
		'number=',
		{
			type: Types.NameExpression,
			name: 'number',
			optional: true
		}
	],
	[
		'optional Object parameter',
		'Object=',
		{
			type: Types.NameExpression,
			name: 'Object',
			optional: true
		}
	],
	[
		'null',
		'null',
		{
			type: Types.NullLiteral
		}
	],
	[
		'undefined',
		'undefined',
		{
			type: Types.UndefinedLiteral
		}
	],
	[
		'all',
		'*',
		{
			type: Types.AllLiteral
		}
	],
	[
		'unknown',
		'?',
		{
			type: Types.UnknownLiteral
		}
	],
	[
		'name that starts with a reserved word',
		'forsooth',
		{
			type: Types.NameExpression,
			name: 'forsooth'
		}
	]
];

'use strict';

var Types = require('../../../lib/types');

module.exports = [
	{
		description: 'array of Foo objects',
		expression: 'Array.<<a href="Foo.html">Foo</a>>',
		newExpression: 'Array.&lt;<a href="Foo.html">Foo</a>>',
		parsed: {
			type: Types.TypeApplication,
			expression: {
				type: Types.NameExpression,
				name: 'Array'
			},
			applications: [
				{
					type: Types.NameExpression,
					name: '<a href="Foo.html">Foo</a>'
				}
			]
		}
	}
];

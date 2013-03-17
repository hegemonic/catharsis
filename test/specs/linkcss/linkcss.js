'use strict';

var Types = require('../../../lib/types');

module.exports = [
	{
		description: 'type application',
		expression: 'Array.<Foo>',
		newExpression: 'Array.&lt;<a href="Foo.html" class="my-class">Foo</a>>',
		parsed: {
			type: Types.TypeApplication,
			expression: {
				type: Types.NameExpression,
				name: 'Array'
			},
			applications: [
				{
					type: Types.NameExpression,
					name: 'Foo'
				}
			]
		}
	},
	{
		description: 'name expression for a class within a module',
		expression: 'module:foo/bar/baz~Qux',
		newExpression: '<a href="foobarbazqux.html" class="my-class">module:foo/bar/baz~Qux</a>',
		parsed: {
			type: Types.NameExpression,
			name: 'module:foo/bar/baz~Qux'
		}
	}
];

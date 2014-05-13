'use strict';

var Types = require('../../../lib/types');

module.exports = [
	{
		description: 'type application',
		expression: 'Array.<Foo>',
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
					name: 'Foo'
				}
			]
		},
		described: {
			en: {
				simple: 'Array of <a href="Foo.html">Foo</a>',
				extended: {
					description: 'Array of <a href="Foo.html">Foo</a>',
					modifiers: {},
					returns: ''
				}
			}
		}
	},
	{
		description: 'name expression for a class within a module',
		expression: 'module:foo/bar/baz~Qux',
		newExpression: '<a href="foobarbazqux.html">module:foo/bar/baz~Qux</a>',
		parsed: {
			type: Types.NameExpression,
			name: 'module:foo/bar/baz~Qux'
		},
		described: {
			en: {
				simple: '<a href="foobarbazqux.html">module:foo/bar/baz~Qux</a>',
				extended: {
					description: '<a href="foobarbazqux.html">module:foo/bar/baz~Qux</a>',
					modifiers: {},
					returns: ''
				}
			}
		}
	}
];

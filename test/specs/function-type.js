'use strict';

module.exports = [
	[
		'function with two basic parameters',
		'function(string, boolean)',
		{
			typeName: 'function',
			signature: {
				parameters: [
					{
						name: undefined,
						type: {
							typeName: 'string'
						}
					},
					{
						name: undefined,
						type: {
							typeName: 'boolean'
						}
					}
				]
			}
		}
	],
	[
		'function with no parameters and a return value',
		'function(): number',
		{
			typeName: 'function',
			signature: {
				parameters: [],
				funcReturns: {
					typeName: 'number'
				}
			}
		}
	],
	[
		'function with a "this" type and one parameter',
		'function(this:goog.ui.Menu, string)',
		{
			typeName: 'function',
			signature: {
				parameters: [
					{
						name: undefined,
						type: {
							typeName: 'string'
						}
					}
				],
				funcThis: 'goog.ui.Menu'
			}
		}
	],
	[
		'function with a "new" type and one parameter',
		'function(new:goog.ui.Menu, string)',
		{
			typeName: 'function',
			signature: {
				parameters: [
					{
						name: undefined,
						type: {
							typeName: 'string'
						}
					}
				],
				funcNew: 'goog.ui.Menu'
			}
		}
	],
	[
		'function with a variable number of parameters and a return value',
		'function(string, ...[number]): number',
		{
			typeName: 'function',
			signature: {
				parameters: [
					{
						name: undefined,
						type: {
							typeName: 'string'
						}
					},
					{
						name: undefined,
						type: {
							typeName: 'number',
							repeatable: true
						}
					}
				],
				funcReturns: {
					typeName: 'number'
				}
			}
		}
	],
	[
		'function with a variable number of named/unnamed parameters, a "new" type, ' +
			'a "this" type, and a return value',
		'function(new:Master, this:Everyone, string, foo:goog.ui.Menu, bar:Array.<Object>, ' +
			'...[baz:string]): boolean',
		{
			typeName: 'function',
			signature: {
				parameters: [
					{
						name: undefined,
						type: {
							typeName: 'string'
						}
					},
					{
						name: 'foo',
						type: {
							typeName: 'goog.ui.Menu'
						}
					},
					{
						name: 'bar',
						type: {
							typeName: 'Array',
							canContain: [
								{
									typeName: 'Object'
								}
							]
						}
					},
					{
						name: 'baz',
						type: {
							typeName: 'string',
							repeatable: true
						}
					}
				],
				funcNew: 'Master',
				funcThis: 'Everyone',
				funcReturns: {
					typeName: 'boolean'
				}
			}
		}
	]
];

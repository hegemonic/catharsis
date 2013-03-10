'use strict';

var Types = require('../../lib/types');

module.exports = [
	{
		description: 'union with 2 types (number and boolean)',
		expression: '(number|boolean)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			]
		}
	},
	{
		description: 'union with 2 types (Object and undefined)',
		expression: '(Object|undefined)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'Object'
				},
				{
					type: Types.UndefinedLiteral
				}
			]
		}
	},
	{
		description: 'union with 3 types (number, Window, and goog.ui.Menu)',
		expression: '(number|Window|goog.ui.Menu)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'Window'
				},
				{
					type: Types.NameExpression,
					name: 'goog.ui.Menu'
				}
			]
		}
	},
	{
		description: 'nullable union with 2 types (number and boolean)',
		expression: '?(number|boolean)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			],
			nullable: true
		}
	},
	{
		description: 'non-nullable union with 2 types (number and boolean)',
		expression: '!(number|boolean)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			],
			nullable: false
		}
	},
	{
		description: 'optional union with 2 types (number and boolean)',
		expression: '(number|boolean)=',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'boolean'
				}
			],
			optional: true
		}
	},

	// The following type expressions are adapted from the Closure Compiler test suite:
	// http://goo.gl/vpRTe, http://goo.gl/DVh3f
	{
		description: 'union with 2 types (array and object with unknown value type)',
		expression: '(Array|Object.<string, ?>)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'Array'
				},
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Object'
					},
					applications: [
						{
							type: Types.NameExpression,
							name: 'string'
						},
						{
							type: Types.UnknownLiteral
						}
					]
				}
			]
		}
	},
	{
		description: 'union with 2 type applications',
		expression: '(Array.<string>|Object.<string, ?>)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Array'
					},
					applications: [
						{
							type: Types.NameExpression,
							name: 'string'
						}
					]
				},
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Object'
					},
					applications: [
						{
							type: Types.NameExpression,
							name: 'string'
						},
						{
							type: Types.UnknownLiteral
						}
					]
				}
			]
		}
	},
	{
		description: 'union with 2 types (an error, or a function that returns an error)',
		expression: '(Error|function(): Error)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'Error'
				},
				{
					type: Types.FunctionType,
					params: [],
					result: {
						type: Types.NameExpression,
						name: 'Error'
					}
				}
			]
		}
	},

	// The following type expressions are adapted from the Doctrine parser:
	// http://constellation.github.com/doctrine/demo/
	{
		description: 'optional union with multiple types',
		expression: '(jQuerySelector|Element|Object|Array.<Element>|jQuery|string|function())=',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'jQuerySelector'
				},
				{
					type: Types.NameExpression,
					name: 'Element'
				},
				{
					type: Types.NameExpression,
					name: 'Object'
				},
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Array'
					},
					applications: [
						{
							type: Types.NameExpression,
							name: 'Element'
						}
					]
				},
				{
					type: Types.NameExpression,
					name: 'jQuery'
				},
				{
					type: Types.NameExpression,
					name: 'string'
				},
				{
					type: Types.FunctionType,
					params: []
				}
			],
			optional: true
		}
	},
	{
		description: 'optional union with multiple types, including a nested union type',
		expression: '(Element|Object|Document|Object.<string, (string|function(!jQuery.event=))>)=',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'Element'
				},
				{
					type: Types.NameExpression,
					name: 'Object'
				},
				{
					type: Types.NameExpression,
					name: 'Document'
				},
				{
					type: Types.TypeApplication,
					expression: {
						type: Types.NameExpression,
						name: 'Object'
					},
					applications: [
						{
							type: Types.NameExpression,
							name: 'string'
						},
						{
							type: Types.TypeUnion,
							elements: [
								{
									type: Types.NameExpression,
									name: 'string'
								},
								{
									type: Types.FunctionType,
									params: [
										{
											type: Types.NameExpression,
											name: 'jQuery.event',
											optional: true,
											nullable: false
										}
									]
								}
							]
						}
					]
				}
			],
			optional: true
		}
	}
];

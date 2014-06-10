'use strict';

var en = {
	modifiers: require('../../res/en').modifiers
};
var _ = require('underscore');

var Types = require('../../lib/types');

var repeatable = {
	repeatable: true
};

var numberBoolean = {
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
};
var numberBooleanRepeatable = _.extend({}, numberBoolean, repeatable);

module.exports = [
	{
		description: 'union with 2 types (number and boolean)',
		expression: '(number|boolean)',
		parsed: numberBoolean,
		described: {
			en: {
				simple: '(number or boolean)',
				extended: {
					description: '(number or boolean)',
					modifiers: {},
					returns: ''
				}
			}
		}
	},
	{
		description: 'repeatable union with 2 types (number and boolean)',
		expression: '...(number|boolean)',
		parsed: numberBooleanRepeatable,
		described: {
			en: {
				simple: 'repeatable (number or boolean)',
				extended: {
					description: '(number or boolean)',
					modifiers: {
						repeatable: en.modifiers.extended.repeatable
					},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: '(Object or undefined)',
				extended: {
					description: '(Object or undefined)',
					modifiers: {},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: '(number, Window, or goog.ui.Menu)',
				extended: {
					description: '(number, Window, or goog.ui.Menu)',
					modifiers: {},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: 'nullable (number or boolean)',
				extended: {
					description: '(number or boolean)',
					modifiers: {
						nullable: en.modifiers.extended.nullable
					},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: 'non-null (number or boolean)',
				extended: {
					description: '(number or boolean)',
					modifiers: {
						nullable: en.modifiers.extended.nonNullable
					},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: 'optional (number or boolean)',
				extended: {
					description: '(number or boolean)',
					modifiers: {
						optional: en.modifiers.extended.optional
					},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: '(Array or Object with unknown type properties)',
				extended: {
					description: '(Array or Object with unknown type properties)',
					modifiers: {},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: '(Array of string or Object with unknown type properties)',
				extended: {
					description: '(Array of string or Object with unknown type properties)',
					modifiers: {},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: '(Error or function() returns Error)',
				extended: {
					description: '(Error or function() returns Error)',
					modifiers: {},
					returns: ''
				}
			}
		}
	},
	{
		description: 'type union with no enclosing parentheses',
		expression: 'number|string',
		newExpression: '(number|string)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number'
				},
				{
					type: Types.NameExpression,
					name: 'string'
				}
			]
		},
		described: {
			en: {
				simple: '(number or string)',
				extended: {
					description: '(number or string)',
					modifiers: {},
					returns: ''
				}
			}
		}
	},
	{
		description: 'type union with modifiers and no enclosing parentheses',
		expression: '!number|!string',
		newExpression: '(!number|!string)',
		parsed: {
			type: Types.TypeUnion,
			elements: [
				{
					type: Types.NameExpression,
					name: 'number',
					nullable: false
				},
				{
					type: Types.NameExpression,
					name: 'string',
					nullable: false
				}
			]
		},
		described: {
			en: {
				simple: '(non-null number or non-null string)',
				extended: {
					description: '(non-null number or non-null string)',
					modifiers: {},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: 'optional (jQuerySelector, Element, Object, Array of Element, jQuery, ' +
					'string, or function())',
				extended: {
					description: '(jQuerySelector, Element, Object, Array of Element, jQuery, ' +
					'string, or function())',
					modifiers: {
						optional: en.modifiers.extended.optional
					},
					returns: ''
				}
			}
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
		},
		described: {
			en: {
				simple: 'optional (Element, Object, Document, or Object with ' +
					'(string or function(optional non-null jQuery.event)) properties)',
				extended: {
					description: '(Element, Object, Document, or Object with (string or ' +
					'function(optional non-null jQuery.event)) properties)',
					modifiers: {
						optional: en.modifiers.extended.optional
					},
					returns: ''
				}
			}
		}
	}
];

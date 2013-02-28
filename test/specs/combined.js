'use strict';

var Types = require('../../lib/types');

module.exports = [
	// categories refer to outermost type
	
	// function
	// TODO
	
	// record
	// TODO
	
	// type application
	// TODO
	
	// union
	[
		// from http://constellation.github.com/doctrine/demo/
		'optional union with multiple types',
		'(jQuerySelector|Element|Object|Array.<Element>|jQuery|string|function())=',
		{
			type: Types.UnionType,
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
	],
	[
		// from http://constellation.github.com/doctrine/demo/
		'optional union with multiple types, including a nested union type',
		'(Element|Object|Document|Object.<string, (string|function(!jQuery.event=))>)=',
		{
			type: Types.UnionType,
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
							type: Types.UnionType,
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
	]
];

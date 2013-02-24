'use strict';

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
			union: [
				{
					typeName: 'jQuerySelector'
				},
				{
					typeName: 'Element'
				},
				{
					typeName: 'Object'
				},
				{
					typeName: 'Array',
					canContain: [
						{
							typeName: 'Element'
						}
					]
				},
				{
					typeName: 'jQuery'
				},
				{
					typeName: 'string'
				},
				{
					typeName: 'function',
					signature: {
						parameters: []
					}
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
			union: [
				{
					typeName: 'Element'
				},
				{
					typeName: 'Object'
				},
				{
					typeName: 'Document'
				},
				{
					typeName: 'Object',
					canContain: [
						{
							typeName: 'string'
						},
						{
							union: [
								{
									typeName: 'string'
								},
								{
									typeName: 'function',
									signature: {
										parameters: [
											{
												typeName: 'jQuery.event',
												optional: true,
												nullable: false
											}
										]
									}
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

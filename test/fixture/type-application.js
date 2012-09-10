"use strict";

module.exports = [
	[
		"array of strings",
		"Array.<string>",
		{
			typeName: "Array",
			canContain: [
				{
					typeName: "string"
				}
			]
		}
	],
	[
		"object whose properties are strings and property values are numbers",
		"Object.<string, number>",
		{
			typeName: "Object",
			canContain: [
				{
					typeName: "string"
				},
				{
					typeName: "number"
				}
			]
		}
	],
	[
		"array of objects that have a length property",
		"Array.<{length}>",
		{
			typeName: "Array",
			canContain: [
				{
					typeName: "object",
					properties: [
						{
							name: "length",
							typeName: undefined
						}
					]
				}
			]
		}
	]
];

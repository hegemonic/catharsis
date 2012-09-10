"use strict";

module.exports = [
	[
		"union with 2 types (number and boolean)",
		"(number|boolean)",
		[
			{
				typeName: "number"
			},
			{
				typeName: "boolean"
			}
		]
	],
	[
		"union with 2 types (Object and undefined)",
		"(Object|undefined)",
		[
			{
				typeName: "Object"
			},
			{
				typeName: "undefined"
			}
		]
	],
	[
		"union with 3 types (number, Window, and goog.ui.Menu)",
		"(number|Window|goog.ui.Menu)",
		[
			{
				typeName: "number"
			},
			{
				typeName: "Window"
			},
			{
				typeName: "goog.ui.Menu"
			}
		]
	]
];

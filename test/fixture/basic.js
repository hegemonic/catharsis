"use strict";

module.exports = [
	[
		"boolean",
		"boolean",
		{
			typeName: "boolean"
		}
	],
	[
		"object",
		"Window",
		{
			typeName: "Window"
		}
	],
	[
		"object with properties",
		"goog.ui.Menu",
		{
			typeName: "goog.ui.Menu"
		}
	],
	[
		"variable number of parameters",
		"...number",
		{
			typeName: "number",
			repeatable: true
		}
	],
	[
		"optional number parameter",
		"number=",
		{
			typeName: "number",
			optional: true
		}
	],
	[
		"optional Object parameter",
		"Object=",
		{
			typeName: "Object",
			optional: true
		}
	]
];

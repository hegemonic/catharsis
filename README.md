# Catharsis

A parser for Google Closure Compiler
[type expressions](https://developers.google.com/closure/compiler/docs/js-for-compiler#types).

Catharsis is designed to be:

+ **Accurate**. Catharsis is based on a [PEG.js](http://pegjs.majda.cz/) grammar that can handle
any valid type expression, no matter how complex.
+ **Fast**. Parse results are cached, so the parser is only invoked when necessary.
+ **Flexible**. Catharsis can be used synchronously or asynchronously.


## Examples

Asynchronous parsing:

	var catharsis = require("catharsis");

	var type = "!Object";

	catharsis.parse(type, function(error, parsed) {
		if (error) {
			console.error("couldn't parse %s: %s", type, error);
		} else {
			console.log("%j", parsed);  // {"typeName":"Object","nullable":false}
		}
	});

Synchronous parsing:

	var catharsis = require("catharsis");

	var type = "!Object",
		parsed;

	try {
		parsed = catharsis.parseSync("!Object");  // {"typeName":"Object","nullable":false}
	}
	catch(e) {
		console.error("couldn't parse %s: %s", type, e);
	}

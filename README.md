# Catharsis #

A JavaScript parser for Google Closure Compiler
[type expressions](https://developers.google.com/closure/compiler/docs/js-for-compiler#types).

Catharsis is designed to be:

+ **Accurate**. Catharsis is based on a [PEG.js](http://pegjs.majda.cz/) grammar that can handle
any valid type expression, no matter how complex. It uses a
[Mocha](http://visionmedia.github.com/mocha/) test suite to verify the parser's accuracy.
+ **Fast**. Parse results are cached, so the parser is invoked only when necessary.
+ **Flexible**. Catharsis provides both asynchronous and synchronous interfaces. In addition, it can
convert parse results back into type expressions.


## Examples ##

Asynchronous interface:

	var catharsis = require('catharsis');

	var type = '!Object';

	catharsis.parse(type, {}, function(error, parsedType) {
		if (error) {
			console.error('unable to parse %s: %s', type, error);
		} else {
			console.log('%j', parsedType);  // {"typeName":"Object","nullable":false}
			catharsis.stringify(parsedType, {}, function(error, expr) {
				if (error) {
					console.error('unable to stringify %j: %s', parsedType, error);
				} else {
					console.log('%s', expr);  // !Object
				}
			});
		}
	});

Synchronous interface:

	var catharsis = require('catharsis');

	var type = '!Object';
	var parsedType;
	var expr;

	try {
		parsedType = catharsis.parseSync('!Object');  // {"typeName":"Object","nullable":false}
	}
	catch(e) {
		console.error('unable to parse %s: %s', type, e);
	}

	try {
		expr = catharsis.stringifySync(parsedType);  // !Object
	}
	catch(e) {
		console.error('unable to parse %j: %s', parsedType, e);
	}

See the `test/specs/` directory for more examples of Catharsis' parse results.


## Asynchronous interface ##

### parse(type, opts, callback) ###
Parse the Closure Compiler type expression `type`, and pass the parse results to the callback.

#### Parameters ####
+ `type`: A string containing a Closure Compiler type expression.
+ `opts`: Options for parsing the type expression.
    + `opts.useCache`: Specifies whether to use the cache of parsed types. Defaults to `true`.
+ `callback(error, parsedType)`: Parse results.
    + `error`: A description of the error, if any.
    + `parsedType`: An object containing the parse results.

### stringify(parsedType, opts, callback) ###
Stringify the parsed Closure Compiler type expression `parsedType`, and pass the type expression to
the callback.

#### Parameters ####
+ `parsedType`: An object containing a parsed Closure Compiler type expression.
+ `opts`: Options for stringifying the parse results.
    + `opts.useCache`: Specifies whether to use the cache of stringified parse results. Defaults to
    `true`.
    + `opts.validate`: Specifies whether to validate the stringified parse results by attempting to
    parse them as a type expression. Defaults to `false`.
+ `callback(error, typeExpr)`: Stringification results.
    + `error`: A description of the error, if any.
    + `typeExpr`: A string containing the type expression.


## Synchronous interface ##

### parseSync(type, opts) ###
Parse the Closure Compiler type `type`, and return the parse results. Throws an error if the type
cannot be parsed.

#### Parameters ####
+ `type`: A string containing a Closure Compiler type expression.
+ `opts`: Options for parsing the type expression.
    + `opts.useCache`: Specifies whether to use the cache of parsed types. Defaults to `true`.

#### Returns ####
An object containing the parse results.

### stringifySync(parsedType, opts) ###
Stringify the parsed Closure Compiler type expression `parsedType`, and return the type expression.
If validation is enabled, throws an error if the stringified type expression cannot be parsed.

#### Parameters ####
+ `parsedType`: An object containing a parsed Closure Compiler type expression.
+ `opts`: Options for stringifying the parse results.
    + `opts.useCache`: Specifies whether to use the cache of stringified parse results. Defaults to
    `true`.
    + `opts.validate`: Specifies whether to validate the stringified parse results by attempting to
    parse them as a type expression. Defaults to `false`.

#### Returns ####
A string containing the type expression.


## Installation ##

With [npm](http://npmjs.org):

    npm install catharsis

Or without:

    git clone git://github.com/hegemonic/catharsis.git


## Roadmap and known issues ##

Take a look at the [issue tracker](https://github.com/hegemonic/catharsis/issues) to see what's in
store for Catharsis.

Bug reports, feature requests, and pull requests are always welcome! If you're working on a large
pull request, please contact me in advance so I can help things go smoothly.

**Note**: The parse tree's format should not be considered final until Catharsis reaches version
1.0. I'll do my best to provide release notes for any changes.


## Changelog ##

+ 0.3.0 (February 2013):
    + Union types are now returned as an object with a `union` property, which contains the array of
    types for the union. Previous versions returned union types as an array. **Note**: This change
    is not backwards-compatible with previous versions.
    + Union types that are optional or nullable, or that can be passed a variable number of times,
    are now parsed and stringified correctly.
    + Optional function types and record types are now parsed and stringified correctly.
+ 0.2.0 (November 2012):
    + Added `stringify()` and `stringifySync()` methods, which convert a parsed type to a type
    expression.
    + Simplified the parse results for function signatures. **Note**: This change is not
    backwards-compatible with previous versions.
    + Corrected minor errors in README.md.
+ 0.1.1 (November 2012): Added `opts` argument to `parse()` and `parseSync()` methods. **Note**: The
change to `parse()` is not backwards-compatible with previous versions.
+ 0.1.0 (November 2012): Initial release.

## License ##

[MIT license](https://github.com/hegemonic/catharsis/blob/master/LICENSE).

# Catharsis #

A JavaScript parser for Google Closure Compiler
[type expressions](https://developers.google.com/closure/compiler/docs/js-for-compiler#types).

Catharsis is designed to be:

+ **Accurate**. Catharsis is based on a [PEG.js](http://pegjs.majda.cz/) grammar that's designed to
handle any valid type expression. It uses a [Mocha](http://visionmedia.github.com/mocha/) test suite
to verify the parser's accuracy.
+ **Fast**. Parse results are cached, so the parser is invoked only when necessary.
+ **Flexible**. Catharsis can also convert parse results back into type expressions.


## Example ##

	var catharsis = require('catharsis');

	var type = '!Object';
	var parsedType;
	var expr;

	try {
		parsedType = catharsis.parse('!Object');
		console.log('%j', parsedType);  // {"type":"NameExpression,"name":"Object","nullable":false}
	}
	catch(e) {
		console.error('unable to parse %s: %s', type, e);
	}

    expr = catharsis.stringify(parsedType);
    console.log(expr);  // !Object

See the `test/specs/` directory for more examples of Catharsis' parse results.


## Methods ##

### parse(type, opts) ###
Parse the Closure Compiler type `type`, and return the parse results. Throws an error if the type
cannot be parsed.

#### Parameters ####
+ `type`: A string containing a Closure Compiler type expression.
+ `opts`: Options for parsing the type expression.
    + `opts.useCache`: Specifies whether to use the cache of parsed types. Defaults to `true`.

#### Returns ####
An object containing the parse results.

### stringify(parsedType, opts) ###
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

+ 0.3.0 (March 2013):
    + The `parse()` and `stringify()` methods are now synchronous, and the `parseSync()` and
    `stringifySync()` methods have been removed. **Note**: This change is not backwards-compatible
    with previous versions.
    + The parse results now use a significantly different format from previous versions. The new
    format is more expressive and is similar, but not identical, to the format used by the
    [doctrine](https://github.com/Constellation/doctrine) parser. **Note**: This change is not
    backwards-compatible with previous versions.
    + Name expressions that contain a reserved word now include a `reservedWord: true` property.
    + Union types that are optional or nullable, or that can be passed a variable number of times,
    are now parsed and stringified correctly.
    + Optional function types and record types are now parsed and stringified correctly.
    + Function types now longer include `new` or `this` properties unless the properties are defined
    in the type expression. In addition, the `new` and `this` properties can now use any type
    expression.
    + In record types, the key for a field type can now use any type expression.
    + Standalone single-character literals, such as ALL (`*`), are now parsed and stringified
    correctly.
    + `null` and `undefined` literals with additional properties, such as `repeatable`, are now
    stringified correctly.
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

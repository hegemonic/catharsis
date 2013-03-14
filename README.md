# Catharsis #

A JavaScript parser for Google Closure Compiler
[type expressions](https://developers.google.com/closure/compiler/docs/js-for-compiler#types).

Catharsis is designed to be:

+ **Accurate**. Catharsis is based on a [PEG.js](http://pegjs.majda.cz/) grammar that's designed to
handle any valid type expression. It uses a [Mocha](http://visionmedia.github.com/mocha/) test suite
to verify the parser's accuracy.
+ **Fast**. Parse results are cached, so the parser is invoked only when necessary.
+ **Flexible**. Catharsis can convert parse results back into type expressions. In addition, it
provides a lenient mode that also accepts [JSDoc](https://github.com/jsdoc3/jsdoc)-style type
expressions.


## Example ##

	var catharsis = require('catharsis');

    var type;
    var jsdocType;
	var parsedType;
    var parsedJsdocType;

    // normal parsing
	try {
        type = '!Object';
		parsedType = catharsis.parse(type);
		console.log('%j', parsedType);  // {"type":"NameExpression,"name":"Object","nullable":false}
	}
	catch(e) {
		console.error('unable to parse %s: %s', type, e);
	}

    // lenient parsing
    try {
        jsdocType = 'number|string';  // should be (number|string)
        parsedJsdocType = catharsis.parse(jsdocType, {lenient: true});
    }
    catch (e) {
        console.error('you will not see this error, thanks to lenient mode!');
    }

    console.log(catharsis.stringify(parsedType));       // !Object
    console.log(catharsis.stringify(parsedJsdocType));  // number|string
    console.log(catharsis.stringify(parsedJsdocType,    // (number|string)
        {useCache: false}));


See the `test/specs/` directory for more examples of Catharsis' parse results.


## Methods ##

### parse(type, options) ###
Parse the Closure Compiler type `type`, and return the parse results. Throws an error if the type
cannot be parsed.

When called without options, Catharsis attempts to parse type expressions in the same way as
Closure Compiler. When the `lenient` option is enabled, Catharsis can also parse several kinds of
type expressions that are used in [JSDoc](https://github.com/jsdoc3/jsdoc):

+ The string `function` is treated as a function type with no parameters.
+ The period may be omitted from type applications. For example, `Array.<string>` and
`Array<string>` will be parsed in the same way.
+ You may append `[]` to a name expression (for example, `string[]`) to interpret it as a type
application with the expression `Array` (for example, `Array.<string>`).
+ The enclosing parentheses may be omitted from type unions. For example, `(number|string)` and
`number|string` will be parsed in the same way.
+ Name expressions may contain the characters `#`, `~`, `:`, and `/`.
+ Name expressions may contain a reserved word.
+ Record types may use types other than name expressions for keys.

#### Parameters ####
+ `type`: A string containing a Closure Compiler type expression.
+ `options`: Options for parsing the type expression.
    + `options.lenient`: Specifies whether to enable lenient mode. Defaults to `false`.
    + `options.useCache`: Specifies whether to use the cache of parsed types. Defaults to `true`.

#### Returns ####
An object containing the parse results. See the `test/specs/` directory for examples of the parse
results for different type expressions.

The object also includes two non-enumerable properties:

+ `lenient`: A boolean indicating whether the type expression was parsed in lenient mode.
+ `typeExpression`: A string containing the type expression that was parsed.

### stringify(parsedType, options) ###
Stringify the parsed Closure Compiler type expression `parsedType`, and return the type expression.
If validation is enabled, throws an error if the stringified type expression cannot be parsed.

#### Parameters ####
+ `parsedType`: An object containing a parsed Closure Compiler type expression.
+ `options`: Options for stringifying the parse results.
    + `options.htmlSafe`: Specifies whether to return an HTML-safe string that replaces left angle
    brackets (`<`) with the corresponding entity (`&lt;`). **Note**: Characters in name expressions
    are not escaped.
    + `options.useCache`: Specifies whether to use the cache of stringified parse results. If the
    cache is enabled, and the parsed type expression includes a `typeExpression` property, the
    `typeExpression` property will be returned as-is. Defaults to `true`.
    + `options.validate`: Specifies whether to validate the stringified parse results by attempting
    to parse them as a type expression. Defaults to `false`.

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

+ 0.4.2 (March 2013):
    + When lenient parsing is enabled, name expressions can now contain the characters `:` and `/`.
    + When lenient parsing is enabled, a name expression followed by `[]` (for example, `string[]`)
    will be interpreted as a type application with the expression `Array` (for example,
    `Array.<string>`).
+ 0.4.1 (March 2013):
    + The `parse()` and `stringify()` methods now honor all of the specified options.
    + When lenient parsing is enabled, name expressions can now contain a reserved word.
+ 0.4.0 (March 2013):
    + Catharsis now supports a lenient parsing option that can parse several kinds of malformed type
    expressions. See the documentation for details.
    + The objects containing parse results are now frozen.
    + The objects containing parse results now have two non-enumerable properties:
        + `lenient`: A boolean indicating whether the type expression was parsed in lenient mode.
        + `typeExpression`: A string containing the original type expression.
    + The `stringify()` method now honors the `useCache` option. If a parsed type includes a
    `typeExpression` property, and `useCache` is not set to `false`, the stringified type will be
    identical to the original type expression.
+ 0.3.1 (March 2013): Type expressions that begin with a reserved word, such as `integer`, are now
parsed correctly.
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

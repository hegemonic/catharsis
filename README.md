# Catharsis #

A JavaScript parser for Google Closure Compiler
[type expressions](https://developers.google.com/closure/compiler/docs/js-for-compiler#types).

Catharsis is designed to be:

+ **Accurate**. Catharsis is based on a [PEG.js](http://pegjs.majda.cz/) grammar that can handle
any valid type expression, no matter how complex. It uses a
[Mocha](http://visionmedia.github.com/mocha/) test suite to verify the parser's accuracy.
+ **Fast**. Parse results are cached, so the parser is invoked only when necessary.
+ **Flexible**. Catharsis provides both asynchronous and synchronous interfaces.


## Examples ##

Asynchronous interface:

	var catharsis = require('catharsis');

	var type = '!Object';

	catharsis.parse(type, function(error, parsed) {
		if (error) {
			console.error('unable to parse %s: %s', type, error);
		} else {
			console.log('%j', parsed);  // {"typeName":"Object","nullable":false}
		}
	});

Synchronous interface:

	var catharsis = require('catharsis');

	var type = '!Object';
	var parsed;

	try {
		parsed = catharsis.parseSync('!Object');  // {"typeName":"Object","nullable":false}
	}
	catch(e) {
		console.error('unable to parse %s: %s', type, e);
	}

See the `test/specs/` directory for more examples of Catharsis' parse results.


## Installation ##

With [npm](http://npmjs.org):

    npm install catharsis

Or without:

    git clone git://github.com/hegemonic/catharsis.git


## Roadmap and Known Issues ##

Take a look at the [issue tracker](https://github.com/hegemonic/catharsis/issues) to see what's in
store for Catharsis.

Bug reports, feature requests, and pull requests are always welcome! If you're working on a large
pull request, please contact me in advance so I can help things go smoothly.

**Note**: The parse tree's format should not be considered final until Catharsis reaches version
1.0. I'll do my best to provide release notes for any changes.


## License ##

[MIT license](https://github.com/hegemonic/catharsis/blob/master/LICENSE).

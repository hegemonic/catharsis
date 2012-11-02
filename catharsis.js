/**
 * catharsis 0.1.0
 * A parser for Google Closure Compiler type expressions, powered by PEG.js.
 *
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @license MIT License <http://opensource.org/licenses/mit-license.php/>
 */

'use strict';

var parse = require('./lib/parser').parse;

var cache = {};

function cachedParse(string) {
	if (!cache[string]) {
		cache[string] = parse(string);
	}

	return cache[string];
}

var nextTick = (function() {
	if (process && process.nextTick) {
		return process.nextTick;
	} else if (setTimeout) {
		return function(callback) {
			setTimeout(callback, 0);
		};
	} else {
		// better safe than sorry
		return function(callback) {
			callback('Your JavaScript environment does not support the parse() method. ' +
				'Please call parseSync() instead.');
		};
	}
})();

function Catharsis() {}

Catharsis.prototype.parse = function(string, callback) {
	nextTick(function() {
		try {
			callback(null, cachedParse(string));
		}
		catch(e) {
			callback('unable to parse the type ' + string + ': ' + e.message);
		}
	});
};

Catharsis.prototype.parseSync = function(string) {
	return cachedParse(string);
};

module.exports = new Catharsis();

/**
 * catharsis 0.0.1
 * A parser for Google Closure Compiler type expressions, powered by PEG.js.
 *
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @license MIT License (http://opensource.org/licenses/mit-license.php/)
 */

"use strict";

var async = require("async");
var parse = require("./lib/parser").parse;

var cache = {};

function cachedParse(string) {
	if (!cache[string]) {
		cache[string] = parse(string);
	}

	return cache[string];
}

function Catharsis() {}

Catharsis.prototype.parse = function(string, callback) {
	async.nextTick(function() {
		try {
			callback(null, cachedParse(string));
		}
		catch(e) {
			callback("unable to parse the type " + string + ": " + e.message);
		}
	});
};

Catharsis.prototype.parseSync = function(string) {
	return cachedParse(string);
};

module.exports = new Catharsis();

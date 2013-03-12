/**
 * catharsis 0.4.0
 * A parser for Google Closure Compiler type expressions, powered by PEG.js.
 *
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @license MIT License <http://opensource.org/licenses/mit-license.php/>
 */

'use strict';

var parse = require('./lib/parser').parse;
var stringify = require('./lib/stringify');

var typeExpressionCache = {};
var lenientTypeExpressionCache = {};

var parsedTypeCache = {};
var lenientParsedTypeCache = {};

function cachedParse(expr, options) {
	var cache = options.lenient ? lenientTypeExpressionCache : typeExpressionCache;
	if (!cache[expr]) {
		cache[expr] = parse(expr);
	}

	return cache[expr];
}

function cachedStringify(parsedType, options) {
	var cache = options.lenient ? lenientParsedTypeCache : parsedTypeCache;
	var json = JSON.stringify(parsedType);
	if (!cache[json]) {
		cache[json] = stringify(parsedType);
	}

	return cache[json];
}

function Catharsis() {
	this.Types = require('./lib/types');
}

Catharsis.prototype.parse = function(typeExpr, options) {
	options = options || {};

	return options.useCache !== false ? cachedParse(typeExpr, options) : parse(typeExpr, options);
};

Catharsis.prototype.stringify = function(parsedType, options) {
	options = options || {};
	var result;

	result = options.useCache !== false ? cachedStringify(parsedType, options) :
		stringify(parsedType, options);
	if (options.validate) {
		this.parse(result, options);
	}

	return result;
};

module.exports = new Catharsis();

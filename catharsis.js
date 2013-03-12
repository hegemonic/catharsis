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

function cachedParse(expr, opts) {
	var cache = opts.lenient ? lenientTypeExpressionCache : typeExpressionCache;
	if (!cache[expr]) {
		cache[expr] = parse(expr);
	}

	return cache[expr];
}

function cachedStringify(parsedType, opts) {
	var cache = opts.lenient ? lenientParsedTypeCache : parsedTypeCache;
	var json = JSON.stringify(parsedType);
	if (!cache[json]) {
		cache[json] = stringify(parsedType);
	}

	return cache[json];
}

function Catharsis() {
	this.Types = require('./lib/types');
}

Catharsis.prototype.parse = function(typeExpr, opts) {
	opts = opts || {};

	return opts.useCache !== false ? cachedParse(typeExpr, opts) : parse(typeExpr, opts);
};

Catharsis.prototype.stringify = function(parsedType, opts) {
	opts = opts || {};
	var result;

	result = opts.useCache !== false ? cachedStringify(parsedType, opts) :
		stringify(parsedType, opts);
	if (opts.validate) {
		this.parse(result, opts);
	}

	return result;
};

module.exports = new Catharsis();

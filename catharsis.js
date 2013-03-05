/**
 * catharsis 0.3.0
 * A parser for Google Closure Compiler type expressions, powered by PEG.js.
 *
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @license MIT License <http://opensource.org/licenses/mit-license.php/>
 */

'use strict';

var parse = require('./lib/parser').parse;
var stringify = require('./lib/stringify');

var typeExpressionCache = {};
var parsedTypeCache = {};

function cachedParse(expr) {
	if (!typeExpressionCache[expr]) {
		typeExpressionCache[expr] = parse(expr);
	}

	return typeExpressionCache[expr];
}

function cachedStringify(parsedType) {
	var json = JSON.stringify(parsedType);
	if (!parsedTypeCache[json]) {
		parsedTypeCache[json] = stringify(parsedType);
	}

	return parsedTypeCache[json];
}

function Catharsis() {
	this.Types = require('./lib/types');
}

Catharsis.prototype.parse = function(type, opts) {
	opts = opts || {};

	return opts.useCache !== false ? cachedParse(type) : parse(type);
};

Catharsis.prototype.stringify = function(parsedType, opts) {
	opts = opts || {};
	var result;

	result = opts.useCache !== false ? cachedStringify(parsedType) : stringify(parsedType);
	if (opts.validate) {
		this.parse(result);
	}

	return result;
};

module.exports = new Catharsis();

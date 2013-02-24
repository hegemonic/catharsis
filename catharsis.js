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
			callback('Your JavaScript environment does not support the Catharsis asynchronous ' +
				'methods. Please call the synchronous methods instead.');
		};
	}
})();

function Catharsis() {}

Catharsis.prototype.parse = function(type, opts, callback) {
	opts = opts || {};

	nextTick(function() {
		try {
			callback(null, opts.useCache !== false ? cachedParse(type) : parse(type));
		}
		catch(e) {
			callback('unable to parse the type ' + type + ': ' + e.message);
		}
	});
};

var parseSync = Catharsis.prototype.parseSync = function(type, opts) {
	opts = opts || {};
	
	return opts.useCache !== false ? cachedParse(type) : parse(type);
};

Catharsis.prototype.stringify = function(parsedType, opts, callback) {
	opts = opts || {};
	var result;

	nextTick(function() {
		try {
			result = opts.useCache !== false ? cachedStringify(parsedType) : stringify(parsedType);
			if (opts.validate) {
				parseSync(result);
			}
			callback(null, result);
		} catch (e) {
			callback('the following parsed type is not valid: ' + JSON.stringify(parsedType));
		}
	});
};

Catharsis.prototype.stringifySync = function(parsedType, opts) {
	opts = opts || {};
	var result;

	result = opts.useCache !== false ? cachedStringify(parsedType) : stringify(parsedType);
	if (opts.validate) {
		parseSync(result);
	}

	return result;
};

module.exports = new Catharsis();

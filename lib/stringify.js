'use strict';

var parse = require('./parser').parse;
var util = require('util');

function Stringifier() {
	// in a list of function signature params, repeatable params are stringified differently
	this._inFunctionSignatureParams = false;
}

Stringifier.prototype.canContain = function(canContain) {
	if (!canContain) {
		return '';
	}

	var result = [];

	for (var i = 0, l = canContain.length; i < l; i++) {
		result.push(this.type(canContain[i]));
	}

	return '.<' + result.join(', ') + '>';
};

Stringifier.prototype.funcNew = function(funcNew) {
	return funcNew ? 'new:' + funcNew : '';
};

Stringifier.prototype.funcReturns = function(funcReturns) {
	return funcReturns ? ': ' + this.type(funcReturns) : '';
};

Stringifier.prototype.funcThis = function(funcThis) {
	return funcThis ? 'this:' + funcThis : '';
};

Stringifier.prototype.name = function(name) {
	return name || '';
};

Stringifier.prototype.nullable = function(nullable) {
	switch (nullable) {
		case true:
			return '?';
		case false:
			return '!';
		default:
			return '';
	}
};

Stringifier.prototype.optional = function(optional) {
	if (optional === true) {
		return '=';
	} else {
		return '';
	}
};

Stringifier.prototype.parameters = function(params) {
	if (!params || params.length === 0) {
		return '';
	}

	var paramStrings = [];

	var param;
	var string;
	for (var i = 0, l = params.length; i < l; i++) {
		string = this._typeBase(params[i]);
		if (string.length > 0) {
			paramStrings.push(string);
		}
	}

	return paramStrings.join(', ');
};

Stringifier.prototype.properties = function(props) {
	if (!props) {
		return '';
	}

	var result = [];

	var prop;
	var typeAndName;

	for (var i = 0, l = props.length; i < l; i++) {
		prop = props[i];

		typeAndName = prop.typeName ? util.format('%s: ', prop.typeName) : '';
		typeAndName += this.name(prop.name);

		result.push(typeAndName);
	}

	return result;
};

Stringifier.prototype.signature = function(sig) {
	var params = [];
	var param;
	var result = '';

	// these go within the signature's parens, in this order
	var props = [
		'funcNew',
		'funcThis',
		'parameters'
	];
	var prop;

	this._inFunctionSignatureParams = true;
	for (var i = 0, l = props.length; i < l; i++) {
		prop = props[i];
		param = this[prop](sig[prop]);
		if (param.length > 0) {
			params.push(param);
		}
	}
	this._inFunctionSignatureParams = false;

	result = util.format('(%s)', params.join(', '));
	result += this.funcReturns(sig.funcReturns);

	return result;
};

Stringifier.prototype.type = function(type) {
	if (!type) {
		return '';
	}

	var result = '';

	if (util.isArray(type)) {
		result += this._union(type);
	} else if (type.properties) {
		result += this._record(type);
	} else {
		result += this._typeBase(type);
	}

	return result;
};

Stringifier.prototype.stringify = Stringifier.prototype.type;

Stringifier.prototype.typeName = function(typeName) {
	return typeName || '';
};

Stringifier.prototype._record = function(type) {
	var props = this._recordProperties(type.properties);

	return util.format('{%s}', props.join(', '));
};

Stringifier.prototype._recordProperties = function(props) {
	if (!props) {
		return '';
	}

	var result = [];

	var prop;
	var nameAndType;

	for (var i = 0, l = props.length; i < l; i++) {
		prop = props[i];

		nameAndType = this.name(prop.name);
		nameAndType += prop.typeName ? util.format(': %s', prop.typeName) : '';

		result.push(nameAndType);
	}

	return result;
};

function combineNameAndType(name, typeName) {
	var format = (name.length > 0 && typeName.length > 0) ? '%s:%s' : '%s%s';
	return util.format(format, name, typeName);
}

function formatRepeatable(name, typeName, formatter) {
	var nameAndType = combineNameAndType(name, typeName);
	return util.format(formatter, nameAndType);
}

Stringifier.prototype._repeatable = function(type) {
	var name = this.name(type.name);
	var typeName = this.typeName(type.typeName);
	var format = type.repeatable === true ? '...%s' : '%s';

	return formatRepeatable(name, typeName, format);
};

Stringifier.prototype._repeatableInSignature = function(param) {
	var name = this.name(param.name);
	var typeName = this.typeName(param.typeName);
	var format = param.repeatable === true ? '...[%s]' : '%s';

	return formatRepeatable(name, typeName, format);
};

Stringifier.prototype._typeBase = function(type) {
	if (!type) {
		return '';
	}

	// nullable comes first
	var result = this.nullable(type.nullable);

	// then the type name, with appropriate decoration if it's repeatable
	if (this._inFunctionSignatureParams) {
		result += this._repeatableInSignature(type);
	} else {
		result += this._repeatable(type);
	}

	// then deal with the following properties, in order
	var props = [
		'optional',
		'canContain',
		'signature'
	];
	var prop;

	for (var i = 0, l = props.length; i < l; i++) {
		prop = props[i];
		if (type[prop]) {
			result += this[prop](type[prop]);
		}
	}

	return result;
};

Stringifier.prototype._union = function(types) {
	if (!types) {
		return '';
	}

	var result = [];

	for (var i = 0, l = types.length; i < l; i++) {
		result.push(this.type(types[i]));
	}

	return util.format('(%s)', result.join('|'));
};


module.exports = function(type) {
	return new Stringifier().stringify(type);
};

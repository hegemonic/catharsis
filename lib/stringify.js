'use strict';

var parse = require('./parser').parse;

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
		string = this.type(params[i]);
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

		typeAndName = prop.typeName ? prop.typeName + ': ' : '';
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

	result = '(' + params.join(', ') + ')';
	result += this.funcReturns(sig.funcReturns);

	return result;
};

Stringifier.prototype.type = function(type) {
	if (!type) {
		return '';
	}

	// nullable comes first
	var result = this.nullable(type.nullable);

	// then the name and type, with appropriate decoration if it's repeatable
	result += this._formatNameAndType(type);

	// then deal with the following properties, in order
	var props = [
		'canContain',
		'signature',
		'optional'
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

Stringifier.prototype.stringify = Stringifier.prototype.type;

Stringifier.prototype.typeName = function(typeName) {
	return typeName || '';
};

Stringifier.prototype._record = function(type) {
	var props = this._recordProperties(type.properties);

	return '{' + props.join(', ') + '}';
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
		nameAndType += prop.typeName ? ': ' + prop.typeName : '';

		result.push(nameAndType);
	}

	return result;
};

function combineNameAndType(name, typeName) {
	var separator = (name.length > 0 && typeName.length > 0) ? ':' : '';
	return name + separator + typeName;
}

function formatRepeatable(name, typeName, open, close) {
	var nameAndType = combineNameAndType(name, typeName);
	return open + nameAndType + close;
}

Stringifier.prototype._formatNameAndType = function(type) {
	var name;
	var typeName;
	var open;
	var close;

	name = this.name(type.name);

	if (type.union) {
		typeName = this._union(type);
	} else if (type.properties) {
		typeName = this._record(type);
	} else {
		typeName = this.typeName(type.typeName);
	}

	if (type.repeatable === true) {
		if (this._inFunctionSignatureParams) {
			open = '...[';
			close = ']';
		} else {
			open = '...';
			close = '';
		}

		return formatRepeatable(name, typeName, open, close);
	} else {
		return combineNameAndType(name, typeName);
	}
};

Stringifier.prototype._union = function(type) {
	if (!type) {
		return '';
	}

	var result = [];

	for (var i = 0, l = type.union.length; i < l; i++) {
		result.push(this.type(type.union[i]));
	}

	return '(' + result.join('|') + ')';
};


module.exports = function(type) {
	return new Stringifier().stringify(type);
};

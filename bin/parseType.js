#!/usr/bin/env node

'use strict';

// Command-line tool that parses a type expression and dumps a JSON version of the parse tree.
var catharsis = require('../catharsis');
var path = require('path');
var util = require('util');

var command = path.basename(process.argv[1]);
var typeExpression = process.argv[2];
var parsedType;

function usage() {
	console.log(util.format('Usage:\n    %s [typeExpression]', command));
}

if (!typeExpression) {
	usage();
	process.exit(1);
} else {
	try {
		parsedType = catharsis.parseSync(typeExpression);
	} catch (e) {
		console.error(util.format('Unable to parse "%s" (exception follows):', typeExpression));
		console.error(e.stack || e.message);
		process.exit(1);
	}

	console.log(JSON.stringify(parsedType, null, 2));
	process.exit(0);
}

/*global describe, it */
'use strict';

var _ = require('underscore-contrib');
var describer = require('../lib/describe');
var eql = require('should/lib/eql');
var helper = require('./helper');
var parse = require('../lib/parser').parse;
var path = require('path');
var should = require('should');
var util = require('util');

var defaultModifierText = {
	functionNew: '',
	functionThis: '',
	optional: '',
	nullable: '',
	repeatable: ''
};

function describeIt(expression, parsedType, expected, options) {
	var actual;

	expected.extended.modifiers = _.defaults(expected.extended.modifiers, defaultModifierText);
	actual = describer(parsedType, options);

	if (!eql(actual, expected)) {
		throw new Error(util.format('type expression "%s" was described as %j; expected %j',
			expression, actual, expected));
	}
}

function checkDescribedTypes(filepath, options) {
	var parsedType;
	var types = require(filepath);

	var errors = [];

	types.forEach(function(type) {
		try {
			parsedType = parse(type.expression, options);
			describeIt(type.expression, parsedType, type.described.en, options);
		} catch(e) {
			errors.push(e.message);
		}
	});

	errors.should.eql([]);
}

describe('describe', function() {
	var specs = './test/specs';
	var codetagSpecs = path.join(specs, 'codetag');
	var htmlSpecs = path.join(specs, 'html');
	var jsdocSpecs = path.join(specs, 'jsdoc');
	var linkSpecs = path.join(specs, 'link');
	var linkCssSpecs = path.join(specs, 'linkcss');

	var links = {
		Foo: 'Foo.html',
		'module:foo/bar/baz~Qux': 'foobarbazqux.html'
	};

	function tester(specPath, basename, options) {
		it('can describe types in the "' + basename + '" spec', function() {
			checkDescribedTypes(path.join(specPath, basename), options);
		});
	}

	helper.testSpecs(specs, tester, {});
	helper.testSpecs(codetagSpecs, tester, {
		codeClass: 'code-class',
		codeTag: 'foo'
	});
	helper.testSpecs(htmlSpecs, tester, {});
	helper.testSpecs(jsdocSpecs, tester, {
		jsdoc: true
	});
	helper.testSpecs(linkSpecs, tester, {
		jsdoc: true,
		links: links
	});
	helper.testSpecs(linkCssSpecs, tester, {
		linkClass: 'my-class',
		jsdoc: true,
		links: links
	});
});

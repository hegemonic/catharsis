/* global describe, it */
const _ = require('lodash');
const describer = require('../lib/describe');
const eql = require('should-equal');
const helper = require('./helper');
const parse = require('../lib/parser').parse;
const path = require('path');
const util = require('util');

const defaultModifierText = {
    functionNew: '',
    functionThis: '',
    optional: '',
    nullable: '',
    repeatable: ''
};

function describeIt(expression, parsedType, expected, options) {
    let actual;

    expected.extended.modifiers = _.defaults(expected.extended.modifiers, defaultModifierText);
    actual = describer(parsedType, options);

    if (!eql(actual, expected)) {
        throw new Error(util.format('type expression "%s" was described as %j; expected %j',
            expression, actual, expected));
    }
}

function checkDescribedTypes(filepath, options) {
    let parsedType;
    const types = require(filepath);

    const errors = [];

    types.forEach(({expression, described}) => {
        try {
            parsedType = parse(expression, options);
            describeIt(expression, parsedType, described.en, options);
        } catch (e) {
            errors.push(e.message);
        }
    });

    errors.should.eql([]);
}

describe('describe', () => {
    const specs = './test/specs';
    const codetagSpecs = path.join(specs, 'codetag');
    const htmlSpecs = path.join(specs, 'html');
    const jsdocSpecs = path.join(specs, 'jsdoc');
    const linkSpecs = path.join(specs, 'link');
    const linkCssSpecs = path.join(specs, 'linkcss');

    const links = {
        Foo: 'Foo.html',
        'module:foo/bar/baz~Qux': 'foobarbazqux.html'
    };

    function tester(specPath, basename, options) {
        it(`can describe types in the "${basename}" spec`, () => {
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
        links
    });
    helper.testSpecs(linkCssSpecs, tester, {
        linkClass: 'my-class',
        jsdoc: true,
        links
    });
});

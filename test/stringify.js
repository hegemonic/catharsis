const helper = require('./helper');
const parse = require('../lib/parser').parse;
const path = require('path');
const stringify = require('../lib/stringify');
const util = require('util');

function stringifyIt(item, options) {
  const string = stringify(item.parsed, options);
  const expression = item.newExpression || item.expression;

  if (string !== expression) {
    throw new Error(
      util.format('type expression "%s" was stringified as "%s"', expression, string)
    );
  }

  if (options.validate === undefined || options.validate === true) {
    try {
      parse(string, options);
    } catch (e) {
      throw new Error(
        util.format(
          'unable to parse string "%s", created from %j: %s',
          string,
          item.parsed,
          e.message
        )
      );
    }
  }
}

function checkStringifiedTypes(filepath, options) {
  const types = require(filepath);

  const errors = [];

  types.forEach((type) => {
    try {
      stringifyIt(type, options);
    } catch (e) {
      errors.push(e.message);
    }
  });

  errors.should.eql([]);
}

describe('stringify', () => {
  const specs = './test/specs';
  const htmlSpecs = path.join(specs, 'html');
  const jsdocSpecs = path.join(specs, 'jsdoc');
  const linkSpecs = path.join(specs, 'link');
  const linkCssSpecs = path.join(specs, 'linkcss');

  const links = {
    Foo: 'Foo.html',
    'module:foo/bar/baz~Qux': 'foobarbazqux.html',
  };

  function tester(specPath, basename, options) {
    it(`can stringify types in the "${basename}" spec`, () => {
      checkStringifiedTypes(path.join(specPath, basename), options);
    });
  }

  helper.testSpecs(specs, tester, {});
  helper.testSpecs(jsdocSpecs, tester, { jsdoc: true });
  helper.testSpecs(htmlSpecs, tester, {
    htmlSafe: true,
    validate: false,
  });
  helper.testSpecs(linkSpecs, tester, {
    htmlSafe: true,
    jsdoc: true,
    links,
    validate: false,
  });
  helper.testSpecs(linkCssSpecs, tester, {
    linkClass: 'my-class',
    htmlSafe: true,
    jsdoc: true,
    links,
    validate: false,
  });
});

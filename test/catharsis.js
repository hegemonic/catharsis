const catharsis = require('../catharsis');
const Types = catharsis.Types;

const invalidType = '{*<?';
const invalidRepeatableType = '!...string';
const simpleParsedType = {
  type: Types.NameExpression,
  name: 'string',
};
const invalidParsedType = {
  type: Types.NameExpression,
  applications: {},
  params: 'whatever',
};
const nullParsedType = {
  type: Types.NullLiteral,
};

function dummyResources() {
  return {
    modifiers: {
      extended: {
        prefix: '',
        suffix: '',
      },
      simple: {
        prefix: '',
        suffix: '',
      },
    },
    type: '<%= type %>',
  };
}

describe('catharsis', () => {
  describe('parse()', () => {
    it('is a function', () => {
      expect(catharsis.parse).toBeFunction();
    });

    it('returns an object when given basic input', () => {
      expect(catharsis.parse('foo')).toBeObject();
    });

    it('returns a frozen object', () => {
      expect(Object.isFrozen(catharsis.parse('foo'))).toBeTrue();
    });

    it('returns only its own properties', () => {
      expect(catharsis.parse('constructor')).toBeObject();
    });

    it('should return an object with nonenumerable "typeExpression" and "jsdoc" properties', () => {
      const parsedType = catharsis.parse('foo');
      let descriptor;

      descriptor = Object.getOwnPropertyDescriptor(parsedType, 'typeExpression');
      expect(descriptor.enumerable).toBeFalse();
      expect(descriptor.value).toBe('foo');

      descriptor = Object.getOwnPropertyDescriptor(parsedType, 'jsdoc');
      expect(descriptor.enumerable).toBeFalse();
      expect(descriptor.value).toBeFalse();
    });

    it('throws an error when given an invalid type', () => {
      function invalid() {
        catharsis.parse(invalidType);
      }

      expect(invalid).toThrowError();
    });

    it('throws an error when given an invalid repeatable type', () => {
      function invalid() {
        catharsis.parse(invalidRepeatableType);
      }

      expect(invalid).toThrowError();
    });

    it('passes the specified options to the parser', () => {
      function jsdoc() {
        catharsis.parse('number|string', { jsdoc: true });
      }

      expect(jsdoc).not.toThrow();
    });

    it('uses the regular cache when JSDoc mode is disabled', () => {
      // parse twice to make sure we're getting a cached version
      let bar = catharsis.parse('bar');

      bar = catharsis.parse('bar');

      expect(bar.jsdoc).toBeFalse();
    });

    it('should use the JSDoc cache when JSDoc mode is enabled', () => {
      // parse twice to make sure we're getting a cached version
      let baz = catharsis.parse('baz', { jsdoc: true });

      baz = catharsis.parse('baz', { jsdoc: true });

      expect(baz.jsdoc).toBeTrue();
    });

    it('should strip newlines before parsing a type expression', () => {
      const parsed = catharsis.parse('My\rNew\nClass\r\n');

      expect(parsed.name).toBe('MyNewClass');
    });
  });

  describe('stringify()', () => {
    it('is a function', () => {
      expect(catharsis.stringify).toBeFunction();
    });

    it('returns a string when given basic input', () => {
      expect(catharsis.stringify(simpleParsedType)).toBeString();
    });

    it('throws an error when given invalid input if validation is enabled', () => {
      function invalid() {
        catharsis.stringify(invalidParsedType, { validate: true });
      }

      expect(invalid).toThrow();
    });

    it('does not throw an error when given invalid input if validation is disabled', () => {
      function invalid() {
        catharsis.stringify(invalidParsedType);
      }

      expect(invalid).not.toThrow();
    });

    it('returns the typeExpression property as-is by default', () => {
      const quxString = catharsis.stringify({
        type: Types.NameExpression,
        name: 'qux',
        typeExpression: 'fake type expression',
      });

      expect(quxString).toBe('fake type expression');
    });

    it('does not return the typeExpression property if restringification is requested', () => {
      const quuxString = catharsis.stringify(
        {
          type: Types.NameExpression,
          name: 'quux',
          typeExpression: 'fake type expression',
        },
        {
          restringify: true,
        }
      );

      expect(quuxString).toBe('quux');
    });

    it('does not return the typeExpression property if htmlSafe is enabled', () => {
      const typeAppString = catharsis.stringify(
        {
          type: Types.TypeApplication,
          expression: {
            type: Types.NameExpression,
            name: 'Array',
          },
          applications: [
            {
              type: Types.NameExpression,
              name: 'boolean',
            },
          ],
          typeExpression: 'Array.<boolean>',
        },
        {
          htmlSafe: true,
        }
      );

      expect(typeAppString).toBe('Array.&lt;boolean>');
    });

    it('does not return the typeExpression property if the links option is provided', () => {
      const nameExpString = catharsis.stringify(
        {
          type: Types.NameExpression,
          name: 'string',
          typeExpression: 'fake type expression',
        },
        {
          links: {},
        }
      );

      expect(nameExpString).toBe('string');
    });

    it('accepts a `Map` object that contains links', () => {
      const nameExpString = catharsis.stringify(
        {
          type: Types.NameExpression,
          name: 'string',
        },
        {
          links: new Map([['string', 'https://example.org/']]),
        }
      );

      expect(nameExpString).toBe('<a href="https://example.org/">string</a>');
    });

    it('accepts a `Map`-like object that contains links', () => {
      const nameExpString = catharsis.stringify(
        {
          type: Types.NameExpression,
          name: 'string',
        },
        {
          links: {
            get: (key) => (key === 'string' ? 'https://example.org/' : undefined),
          },
        }
      );

      expect(nameExpString).toBe('<a href="https://example.org/">string</a>');
    });

    // used for multiple tests
    const typeApp = {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Array',
      },
      applications: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
      ],
    };

    it('passes the specified options to the stringifier', () => {
      const string = catharsis.stringify(typeApp, { htmlSafe: true });

      expect(string).toBe('Array.&lt;string>');
    });

    it(
      'should not cache an HTML-safe expression, then return it when the htmlSafe option ' +
        'is disabled',
      () => {
        const string = catharsis.stringify(typeApp, {});

        expect(string).toBe('Array.<string>');
      }
    );
  });

  describe('describe()', () => {
    it('is a function', () => {
      expect(catharsis.describe).toBeFunction();
    });

    it('should return an object when given basic input', () => {
      expect(catharsis.describe(simpleParsedType)).toBeObject();
    });

    it('should return a frozen object', () => {
      expect(Object.isFrozen(catharsis.describe(simpleParsedType))).toBeTrue();
    });

    it('should return an object with a nonenumerable "jsdoc" property', () => {
      const description = catharsis.describe(simpleParsedType);
      const descriptor = Object.getOwnPropertyDescriptor(description, 'jsdoc');

      expect(descriptor.enumerable).toBeFalse();
      expect(descriptor.value).toBeFalse();
    });

    it('should throw an error when given bad input', () => {
      function badInput() {
        catharsis.describe(invalidType);
      }

      expect(badInput).toThrowError();
    });

    it('should use options.language and options.resources when provided', () => {
      let description;
      const language = 'de';
      const nullString = 'nichtig';
      const options = {
        language,
        resources: {
          de: dummyResources(),
        },
      };

      options.resources.de.null = nullString;

      description = catharsis.describe(nullParsedType, options);
      expect(description.simple).toBe(nullString);
      expect(description.extended.description).toBe(nullString);
    });

    it('should throw an error when a language with no resources is specified', () => {
      function noResources() {
        catharsis.describe(nullParsedType, { language: 'qq' });
      }

      expect(noResources).toThrowError();
    });

    it('should accept a `Map` object that contains links', () => {
      const nameExpDescribe = catharsis.describe(
        {
          type: Types.NameExpression,
          name: 'string',
        },
        {
          links: new Map([['string', 'https://example.org/']]),
        }
      );

      expect(nameExpDescribe.simple).toBe('<a href="https://example.org/">string</a>');
    });

    it('should accept a `Map`-like object that contains links', () => {
      const nameExpDescribe = catharsis.describe(
        {
          type: Types.NameExpression,
          name: 'string',
        },
        {
          links: {
            get: (key) => (key === 'string' ? 'https://example.org/' : undefined),
          },
        }
      );

      expect(nameExpDescribe.simple).toBe('<a href="https://example.org/">string</a>');
    });
  });
});

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

    it('returns only its own properties', () => {
      expect(catharsis.parse('constructor')).toBeObject();
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

      expect(string).toBe('Array&lt;string&gt;');
    });
  });

  describe('describe()', () => {
    it('is a function', () => {
      expect(catharsis.describe).toBeFunction();
    });

    it('should return an object when given basic input', () => {
      expect(catharsis.describe(simpleParsedType)).toBeObject();
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

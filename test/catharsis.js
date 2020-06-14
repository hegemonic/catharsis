/* global describe, it */
/* eslint-disable no-unused-expressions */
const catharsis = require('../catharsis');
const should = require('should');
const Types = catharsis.Types;

const invalidType = '{*<?';
const invalidRepeatableType = '!...string';
const simpleParsedType = {
    type: Types.NameExpression,
    name: 'string'
};
const invalidParsedType = {
    type: Types.NameExpression,
    applications: {},
    params: 'whatever'
};
const nullParsedType = {
    type: Types.NullLiteral
};

function dummyResources() {
    return {
        modifiers: {
            extended: {
                prefix: '',
                suffix: ''
            },
            simple: {
                prefix: '',
                suffix: ''
            }
        },
        type: '<%= type %>'
    };
}

describe('catharsis', () => {
    describe('parse()', () => {
        it('should exist', () => {
            should.exist(catharsis.parse);
        });

        it('should be a function', () => {
            catharsis.parse.should.be.a.Function;
        });

        it('should return an object when given basic input', () => {
            catharsis.parse('foo').should.be.an.Object;
        });

        it('should return a frozen object', () => {
            Object.isFrozen(catharsis.parse('foo')).should.equal(true);
        });

        it('should only return its own properties', () => {
            catharsis.parse('constructor').should.be.an.Object;
        });

        it('should return an object with nonenumerable "typeExpression" and "jsdoc" properties',
            () => {
                const parsedType = catharsis.parse('foo');
                let descriptor;

                descriptor = Object.getOwnPropertyDescriptor(parsedType, 'typeExpression');
                descriptor.enumerable.should.equal(false);
                descriptor.value.should.equal('foo');

                descriptor = Object.getOwnPropertyDescriptor(parsedType, 'jsdoc');
                descriptor.enumerable.should.equal(false);
                descriptor.value.should.equal(false);
            });

        it('should throw an error when given an invalid type', () => {
            function invalid() {
                catharsis.parse(invalidType);
            }

            invalid.should.throw();
        });

        it('should throw an error when given an invalid repeatable type', () => {
            function invalid() {
                catharsis.parse(invalidRepeatableType);
            }

            invalid.should.throw();
        });

        it('should pass the specified options to the parser', () => {
            function jsdoc() {
                catharsis.parse('number|string', {jsdoc: true});
            }

            jsdoc.should.not.throw();
        });

        it('should use the regular cache when JSDoc mode is disabled', () => {
            // parse twice to make sure we're getting a cached version
            let bar = catharsis.parse('bar');

            bar = catharsis.parse('bar');

            bar.jsdoc.should.equal(false);
        });

        it('should use the JSDoc cache when JSDoc mode is enabled', () => {
            // parse twice to make sure we're getting a cached version
            let baz = catharsis.parse('baz', {jsdoc: true});

            baz = catharsis.parse('baz', {jsdoc: true});

            baz.jsdoc.should.equal(true);
        });

        it('should strip newlines before parsing a type expression', () => {
            const parsed = catharsis.parse('My\rNew\nClass\r\n');

            parsed.name.should.equal('MyNewClass');
        });
    });

    describe('stringify()', () => {
        it('should exist', () => {
            should.exist(catharsis.stringify);
        });

        it('should be a function', () => {
            catharsis.stringify.should.be.a.Function;
        });

        it('should return a string when given basic input', () => {
            catharsis.stringify(simpleParsedType).should.be.a.String;
        });

        it('should throw an error when given invalid input if validation is enabled', () => {
            function invalid() {
                catharsis.stringify(invalidParsedType, {validate: true});
            }

            invalid.should.throw();
        });

        it('should not throw an error when given invalid input if validation is disabled',
            () => {
                function invalid() {
                    catharsis.stringify(invalidParsedType);
                }

                invalid.should.not.throw();
            });

        it('should return the typeExpression property as-is by default', () => {
            const quxString = catharsis.stringify({
                type: Types.NameExpression,
                name: 'qux',
                typeExpression: 'fake type expression'
            });

            quxString.should.equal('fake type expression');
        });

        it('should not return the typeExpression property if restringification is requested',
            () => {
                const quuxString = catharsis.stringify({
                    type: Types.NameExpression,
                    name: 'quux',
                    typeExpression: 'fake type expression'
                },
                {
                    restringify: true
                });

                quuxString.should.equal('quux');
            });

        it('should not return the typeExpression property if htmlSafe is enabled', () => {
            const typeAppString = catharsis.stringify({
                type: Types.TypeApplication,
                expression: {
                    type: Types.NameExpression,
                    name: 'Array'
                },
                applications: [
                    {
                        type: Types.NameExpression,
                        name: 'boolean'
                    }
                ],
                typeExpression: 'Array.<boolean>'
            },
            {
                htmlSafe: true
            });

            typeAppString.should.equal('Array.&lt;boolean>');
        });

        it('should not return the typeExpression property if the links option is provided',
            () => {
                const nameExpString = catharsis.stringify({
                    type: Types.NameExpression,
                    name: 'string',
                    typeExpression: 'fake type expression'
                },
                {
                    links: {}
                });

                nameExpString.should.equal('string');
            });

        it('should accept a `Map` object that contains links', () => {
            const nameExpString = catharsis.stringify({
                type: Types.NameExpression,
                name: 'string'
            },
            {
                links: new Map([
                    ['string', 'https://example.org/']
                ])
            });

            nameExpString.should.equal('<a href="https://example.org/">string</a>');
        });

        // used for multiple tests
        const typeApp = {
            type: Types.TypeApplication,
            expression: {
                type: Types.NameExpression,
                name: 'Array'
            },
            applications: [
                {
                    type: Types.NameExpression,
                    name: 'string'
                }
            ]
        };

        it('should pass the specified options to the stringifier', () => {
            const string = catharsis.stringify(typeApp, {htmlSafe: true});

            string.should.equal('Array.&lt;string>');
        });

        it('should not cache an HTML-safe expression, then return it when the htmlSafe option ' +
            'is disabled', () => {
            const string = catharsis.stringify(typeApp, {});

            string.should.equal('Array.<string>');
        });
    });

    describe('describe()', () => {
        it('should exist', () => {
            should.exist(catharsis.describe);
        });

        it('should be a function', () => {
            catharsis.describe.should.be.a.Function;
        });

        it('should return an object when given basic input', () => {
            catharsis.describe(simpleParsedType).should.be.an.Object;
        });

        it('should return a frozen object', () => {
            Object.isFrozen(catharsis.describe(simpleParsedType)).should.equal(true);
        });

        it('should return an object with a nonenumerable "jsdoc" property', () => {
            const description = catharsis.describe(simpleParsedType);
            const descriptor = Object.getOwnPropertyDescriptor(description, 'jsdoc');

            descriptor.enumerable.should.equal(false);
            descriptor.value.should.equal(false);
        });

        it('should throw an error when given bad input', () => {
            function badInput() {
                catharsis.describe(invalidType);
            }

            badInput.should.throw();
        });

        it('should use options.language and options.resources when provided', () => {
            let description;
            const language = 'de';
            const nullString = 'nichtig';
            const options = {
                language,
                resources: {
                    de: dummyResources()
                }
            };

            options.resources.de.null = nullString;

            description = catharsis.describe(nullParsedType, options);
            description.simple.should.equal(nullString);
            description.extended.description.should.equal(nullString);
        });

        it('should throw an error when a language with no resources is specified', () => {
            function noResources() {
                catharsis.describe(nullParsedType, {language: 'qq'});
            }

            noResources.should.throw();
        });

        it('should accept a `Map` object that contains links', () => {
            const nameExpDescribe = catharsis.describe({
                type: Types.NameExpression,
                name: 'string'
            },
            {
                links: new Map([
                    ['string', 'https://example.org/']
                ])
            });

            nameExpDescribe.simple.should.equal('<a href="https://example.org/">string</a>');
        });
    });
});

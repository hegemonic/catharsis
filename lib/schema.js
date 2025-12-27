/*
  Copyright 2014 the Catharsis Authors.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

const _ = require('lodash');

// JSON schema types
const ARRAY = 'array';
const BOOLEAN = 'boolean';
const OBJECT = 'object';
const STRING = 'string';

const BOOLEAN_SCHEMA = {
  type: BOOLEAN,
};
const STRING_SCHEMA = {
  type: STRING,
};

const TYPES = require('./types');
const TYPE_NAMES = _.values(TYPES);

module.exports = {
  type: OBJECT,
  additionalProperties: false,
  properties: {
    type: {
      type: STRING,
      enum: TYPE_NAMES,
    },

    // field type
    key: { $ref: '#' },
    value: { $ref: '#' },

    // function type
    params: {
      type: ARRAY,
      items: { $ref: '#' },
    },
    new: { $ref: '#' },
    this: { $ref: '#' },
    result: { $ref: '#' },

    // name expression
    name: STRING_SCHEMA,

    // record type
    fields: {
      type: ARRAY,
      items: { $ref: '#' },
    },

    // type application
    expression: { $ref: '#' },
    applications: {
      type: ARRAY,
      minItems: 1,
      maxItems: 2,
      items: { $ref: '#' },
    },

    // type union
    elements: {
      type: ARRAY,
      minItems: 1,
      items: { $ref: '#' },
    },

    optional: BOOLEAN_SCHEMA,
    nullable: BOOLEAN_SCHEMA,
    repeatable: BOOLEAN_SCHEMA,
    reservedWord: BOOLEAN_SCHEMA,
  },
  required: ['type'],
};

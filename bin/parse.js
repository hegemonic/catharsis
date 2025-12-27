#!/usr/bin/env node

/*
  Copyright 2013 the Catharsis Authors.

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

// Command-line tool that parses a type expression and dumps a JSON version of the parse tree.
const catharsis = require('../catharsis');
const path = require('path');
const util = require('util');

const command = path.basename(process.argv[1]);
const typeExpression = process.argv[2];
const opts = {
  describe: false,
  jsdoc: false,
};
let parsedType;

function usage() {
  console.log(util.format('Usage:\n    %s typeExpression [--jsdoc] [--describe]', command));
}

function done(err) {
  process.exit(err === undefined ? 0 : err);
}

process.argv.slice(3).forEach((arg) => {
  const parsedArg = arg.replace(/^-{2}/, '');

  if (opts[parsedArg] !== undefined) {
    opts[parsedArg] = true;
  } else {
    console.error('Unknown option "%s"', arg);
    usage();
    done(1);
  }
});

if (!typeExpression) {
  usage();
  done(1);
} else {
  try {
    parsedType = catharsis.parse(typeExpression, opts);
    if (opts.describe) {
      parsedType = catharsis.describe(parsedType);
    }
  } catch (e) {
    console.error(util.format('Unable to parse "%s" (exception follows):', typeExpression));
    console.error(e.stack || e.message);
    done(1);
  }

  console.log(JSON.stringify(parsedType, null, 2));
  done();
}

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

const fs = require('fs');
const path = require('path');

module.exports = (filepath, tester, options) => {
  let basename;
  const specPath = path.resolve(filepath);
  const specs = fs.readdirSync(specPath).filter((spec) => {
    // don't treat random temp files as test specs!
    if (spec.indexOf('.') === 0) {
      return false;
    }

    return true;
  });

  specs.forEach((spec) => {
    if (!fs.statSync(path.join(specPath, spec)).isDirectory()) {
      basename = path.basename(spec, '.js');
      tester(specPath, basename, options);
    }
  });
};

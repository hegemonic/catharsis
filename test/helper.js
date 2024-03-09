const fs = require('fs');
const path = require('path');

exports.testSpecs = (filepath, tester, options) => {
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

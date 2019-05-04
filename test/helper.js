'use strict';

var fs = require('fs');
var path = require('path');


exports.testSpecs = function(filepath, tester, options) {
    var basename;
    var specPath = path.resolve(filepath);
    var specs = fs.readdirSync(specPath)
        .filter(function(spec) {
            // don't treat random temp files as test specs!
            if (spec.indexOf('.') === 0) {
                return false;
            }

            return true;
        });

    specs.forEach(function(spec) {
        if (!fs.statSync(path.join(specPath, spec)).isDirectory()) {
            basename = path.basename(spec, '.js');
            tester(specPath, basename, options);
        }
    });
};

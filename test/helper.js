'use strict';

var fs = require('fs');
var path = require('path');


exports.testSpecs = function(filepath, tester, options) {
	var basename;
	var specPath = path.resolve(filepath);
	var specs = fs.readdirSync(specPath);

	specs.forEach(function(spec) {
		if (!fs.statSync(path.join(specPath, spec)).isDirectory()) {
			basename = path.basename(spec, '.js');
			tester.call(this, specPath, basename, options);
		}
	});
};

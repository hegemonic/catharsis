'use strict';

var fs = require('fs');
var path = require('path');


exports.testSpecs = function(tester) {
	var basename;
	var specPath = path.resolve('./test/specs');
	var specs = fs.readdirSync(specPath);

	specs.forEach(function(spec) {
		basename = path.basename(spec, '.js');
		tester.call(this, specPath, basename);
	});
};

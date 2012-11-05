# Contributing to Catharsis #

Thanks for your interest in contributing to Catharsis! Please follow these simple guidelines to make
the process easier for everyone.

1. **Code Style**: Follow the predominant code style in the file you're editing.
2. **Unit Tests**: Write some! It's especially critical to write unit tests if you're changing the
PEG.js grammar or fixing a bug. Your code must also pass all existing unit tests (or, if your code
changes Catharsis' behavior, you must update the tests to reflect the new behavior).

    Catharsis uses [Mocha](http://visionmedia.github.com/mocha/) and
[should](https://github.com/visionmedia/should.js/) for tests. Type `npm test` to run the tests.
3. **JSHint Clean**: Make sure your code, including unit tests, passes the
[JSHint](http://www.jshint.com/docs/) checks in the project's `.jshintrc` file. PEG.js-generated
code is exempt.
4. **Generated Code**: Don't forget to regenerate the parser code after you edit the PEG.js grammar.
Type `npm run-script prepublish` to regenerate the code.
5. **Cross-Platform Compatibility**: Avoid using APIs that are specific to a particular JavaScript
environment, including Node.js, unless there are readily available cross-platform shims for those
APIs.

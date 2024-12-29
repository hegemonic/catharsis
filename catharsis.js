/**
 * Catharsis
 * A parser for Google Closure Compiler type expressions.
 *
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 * @license MIT
 */

const describe = require('./lib/describe');
const { parse } = require('./lib/parser');
const stringify = require('./lib/stringify');
const Types = require('./lib/types');

module.exports = {
  describe,
  parse: (typeExpr, options = {}) => {
    typeExpr = typeExpr
      .replace(/[\r\n]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return parse(typeExpr, options);
  },
  stringify: (parsedType, options = {}) => {
    const stringified = stringify(parsedType, options);

    if (options.validate) {
      module.exports.parse(stringified, options);
    }

    return stringified;
  },
  Types,
};

/* eslint-disable class-methods-use-this */

const Types = require('./types');

function combineNameAndType(nameString, typeString) {
    const separator = (nameString && typeString) ? ':' : '';

    return nameString + separator + typeString;
}

class Stringifier {
    constructor(options) {
        this._options = options || {};
        this._options.linkClass = this._options.linkClass || this._options.cssClass;
    }

    applications(applications) {
        let result = '';
        const strings = [];

        if (!applications) {
            return result;
        }

        for (let i = 0, l = applications.length; i < l; i++) {
            strings.push(this.type(applications[i]));
        }

        if (this._options.htmlSafe) {
            result = '.&lt;';
        } else {
            result = '.<';
        }

        result += `${strings.join(', ')}>`;

        return result;
    }

    elements(elements) {
        let result = '';
        const strings = [];

        if (!elements) {
            return result;
        }

        for (let i = 0, l = elements.length; i < l; i++) {
            strings.push(this.type(elements[i]));
        }

        result = `(${strings.join('|')})`;

        return result;
    }

    key(type) {
        return this.type(type);
    }

    name(name) {
        return name || '';
    }

    new(funcNew) {
        return funcNew ? `new:${this.type(funcNew)}` : '';
    }

    nullable(nullable) {
        switch (nullable) {
            case true:
                return '?';
            case false:
                return '!';
            default:
                return '';
        }
    }

    optional(optional) {
        if (optional === true) {
            return '=';
        } else {
            return '';
        }
    }

    params(params) {
        let result = '';
        const strings = [];

        if (!params || params.length === 0) {
            return result;
        }

        for (let i = 0, l = params.length; i < l; i++) {
            strings.push(this.type(params[i]));
        }

        result = strings.join(', ');

        return result;
    }

    result(result) {
        return result ? `: ${this.type(result)}` : '';
    }

    stringify(type) {
        return this.type(type);
    }

    this(funcThis) {
        return funcThis ? `this:${this.type(funcThis)}` : '';
    }

    type(type) {
        let typeString = '';

        if (!type) {
            return typeString;
        }

        switch (type.type) {
            case Types.AllLiteral:
                typeString = this.#formatNameAndType(type, '*');
                break;
            case Types.FunctionType:
                typeString = this.#signature(type);
                break;
            case Types.NullLiteral:
                typeString = this.#formatNameAndType(type, 'null');
                break;
            case Types.RecordType:
                typeString = this.#record(type);
                break;
            case Types.TypeApplication:
                typeString = this.type(type.expression) + this.applications(type.applications);
                break;
            case Types.UndefinedLiteral:
                typeString = this.#formatNameAndType(type, 'undefined');
                break;
            case Types.TypeUnion:
                typeString = this.elements(type.elements);
                break;
            case Types.UnknownLiteral:
                typeString = this.#formatNameAndType(type, '?');
                break;
            default:
                typeString = this.#formatNameAndType(type);
        }

        // add optional/nullable/repeatable modifiers
        if (!this._options._ignoreModifiers) {
            typeString = this.#addModifiers(type, typeString);
        }

        return typeString;
    }

    #record(type) {
        const fields = this.#recordFields(type.fields);

        return `{${fields.join(', ')}}`;
    }

    #recordFields(fields) {
        let field;
        let keyAndValue;

        const result = [];

        if (!fields) {
            return result;
        }

        for (let i = 0, l = fields.length; i < l; i++) {
            field = fields[i];

            keyAndValue = this.key(field.key);
            keyAndValue += field.value ? `: ${this.type(field.value)}` : '';

            result.push(keyAndValue);
        }

        return result;
    }

    // Adds optional, nullable, and repeatable modifiers if necessary.
    #addModifiers(type, typeString) {
        let combined;

        let optional = '';
        let repeatable = '';

        if (type.repeatable) {
            repeatable = '...';
        }

        combined = this.nullable(type.nullable) + combineNameAndType('', typeString);
        optional = this.optional(type.optional);

        return repeatable + combined + optional;
    }

    #addLinks(nameString) {
        const href = this.#getHrefForString(nameString);
        let link = nameString;
        let linkClass = this._options.linkClass || '';

        if (href) {
            if (linkClass) {
                linkClass = ` class="${linkClass}"`;
            }

            link = `<a href="${href}"${linkClass}>${nameString}</a>`;
        }

        return link;
    }

    #formatNameAndType(type, literal) {
        let nameString = type.name || literal || '';
        const typeString = type.type ? this.type(type.type) : '';

        nameString = this.#addLinks(nameString);

        return combineNameAndType(nameString, typeString);
    }

    #getHrefForString(nameString) {
        let href = '';
        const links = this._options.links;

        if (!links) {
            return href;
        }

        // accept a map or an object
        if (links instanceof Map) {
            href = links.get(nameString);
        } else if ({}.hasOwnProperty.call(links, nameString)) {
            href = links[nameString];
        }

        return href;
    }

    #signature(type) {
        let param;
        let prop;
        let signature;

        const params = [];
        // these go within the signature's parens, in this order
        const props = [
            'new',
            'this',
            'params'
        ];

        for (let i = 0, l = props.length; i < l; i++) {
            prop = props[i];
            param = this[prop](type[prop]);
            if (param.length > 0) {
                params.push(param);
            }
        }

        signature = `function(${params.join(', ')})`;
        signature += this.result(type.result);

        return signature;
    }
}

module.exports = (type, options) => new Stringifier(options).stringify(type);

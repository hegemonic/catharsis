module.exports = Object.freeze({
    // `*`
    AllLiteral: 'AllLiteral',
    // like `blah` in `{blah: string}`
    FieldType: 'FieldType',
    // like `function(string): string`
    FunctionType: 'FunctionType',
    // any string literal, such as `string` or `My.Namespace`
    NameExpression: 'NameExpression',
    // null
    NullLiteral: 'NullLiteral',
    // like `{foo: string}`
    RecordType: 'RecordType',
    // like `Array.<string>`
    TypeApplication: 'TypeApplication',
    // like `(number|string)`
    TypeUnion: 'TypeUnion',
    // like `[number, number]` or `[key: string, value: number]`
    TypeTuple: 'TypeTuple',
    // like `key: string` in `[key: string, value: number]`
    NamedTupleMember: 'NamedTupleMember',
    // undefined
    UndefinedLiteral: 'UndefinedLiteral',
    // `?`
    UnknownLiteral: 'UnknownLiteral'
});

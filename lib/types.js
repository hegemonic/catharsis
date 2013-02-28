'use strict';

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
	// like `...` in `...number`
	RestType: 'RestType',
	// like `Array.<string>`
	TypeApplication: 'TypeApplication',
	// undefined
	UndefinedLiteral: 'UndefinedLiteral',
	// like `(number|string)`
	UnionType: 'UnionType',
	// `?` (Doctrine calls this `NullableLiteral`)
	UnknownLiteral: 'UnknownLiteral',
	// `void`
	VoidLiteral: 'VoidLiteral'
});

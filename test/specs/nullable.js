'use strict';

var _ = require('underscore');

var Types = require('../../lib/types');

var repeatable = {
	repeatable: true
};

var nullableNumber = {
	type: Types.NameExpression,
	name: 'number',
	nullable: true
};
var nullableNumberRepeatable = _.extend({}, nullableNumber, repeatable);

var nonNullableObject = {
	type: Types.NameExpression,
	name: 'Object',
	nullable: false
};
var nonNullableObjectRepeatable = _.extend({}, nonNullableObject, repeatable);

module.exports = [
	{
		description: 'nullable number',
		expression: '?number',
		parsed: nullableNumber
	},
	{
		description: 'postfix nullable number',
		expression: 'number?',
		newExpression: '?number',
		parsed: nullableNumber
	},
	{
		description: 'non-nullable object',
		expression: '!Object',
		parsed: nonNullableObject
	},
	{
		description: 'postfix non-nullable object',
		expression: 'Object!',
		newExpression: '!Object',
		parsed: nonNullableObject
	},
	{
		description: 'repeatable nullable number',
		expression: '...?number',
		parsed: nullableNumberRepeatable
	},
	{
		description: 'postfix repeatable nullable number',
		expression: '...number?',
		newExpression: '...?number',
		parsed: nullableNumberRepeatable
	},
	{
		description: 'repeatable non-nullable object',
		expression: '...!Object',
		parsed: nonNullableObjectRepeatable
	},
	{
		description: 'postfix repeatable non-nullable object',
		expression: '...Object!',
		newExpression: '...!Object',
		parsed: nonNullableObjectRepeatable
	}
];
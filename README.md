# Schematiq - JavaScript object schematiqs

![](https://github.com/crinklesio/schematiq/workflows/test/badge.svg)
[![Node version](https://img.shields.io/npm/v/@crinkles/digl.svg?style=flat)](https://www.npmjs.com/package/@crinkles/digl)
[![NPM Downloads](https://img.shields.io/npm/dm/@crinkles/digl.svg?style=flat)](https://www.npmjs.com/package/@crinkles/digl)
[![Minified size](https://img.shields.io/bundlephobia/min/@crinkles/digl?label=minified)](https://www.npmjs.com/package/@crinkles/digl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight library that allows for object schema validation.

## Object validation

For object validation one defines rules for each property of the object. Combined, rules define the validation schema. Each rule must contain a `type`. Other settings are optional.

```ts
type Rule = {
  type: 'string' | 'boolean' | 'number'; // type error
  required?: boolean; // required error
  regexp?: RegExp; // format error, only when type = 'string'
  custom?: (value, obj) => boolean; // custom error; if custom === false, it gives an error
};

type Schema = {
  [key: string]: Rule; // also for nested properties, e.g. "nested.property"
};
```

when

An object can be validated by using the `validate` function of **schematiq**. It returns an object indicating which properties of the object have errors. It also indicates the type of error, unless you set a custom error message.

```js
import validator from 'schematiq';

const errors = validator(obj, schema);
// { "nested.property": "type" | "required" | "format" | "other" | "my custom message" }
```

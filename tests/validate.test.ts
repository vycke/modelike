/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import validator from '../src/validate';

function isDefault(value): boolean {
  const type = typeof value;

  switch (type) {
    case 'boolean':
      return value === false;
    case 'number':
      return value === 0;
    case 'string':
      return value === '';
    default:
      return false;
  }
}

const typeRule = {
  type: 'string'
};

const regexpRule = {
  type: 'string',
  regexp: /test/g
};

const requiredRule = {
  type: 'string',
  required: true
};

const customMessageRule = {
  type: 'string',
  required: true,
  message: 'This is required'
};

const withRulesRule = {
  type: 'string',
  required: true,
  rule: (v: any) => !isDefault(v)
};

const withRulesRule2 = {
  type: 'string',
  required: true,
  rule: (v: any) => !isDefault(v),
  message: 'This cannot be default'
};

const flatConfig = {
  type1: typeRule,
  type2: typeRule,
  type3: typeRule,
  required: requiredRule,
  nonexisting: requiredRule,
  message: customMessageRule,
  rule1: withRulesRule,
  rule2: withRulesRule2,
  rule3: withRulesRule,
  regexp: regexpRule,
  'nested.value': typeRule
};

const flat = {
  type1: 'test',
  type2: 0,
  required: 'test',
  message: 0,
  rule1: 'test',
  rule2: '',
  rule3: '',
  regexp: 'tast',
  nested: {
    value: 'test'
  }
};

const nestedArrayConfig = {
  users: {
    type: 'array',
    each: { name: { type: 'string' }, id: { type: 'number', required: true } }
  }
};

const nestedArray = {
  users: [{ name: 'test', id: 1 }, { name: 'test' }]
};

describe('validator', () => {
  it('base validation', () => {
    expect(validator(flat, flatConfig)).toEqual({
      type2: 'type',
      nonexisting: 'required',
      regexp: 'format',
      message: 'This is required',
      rule2: 'This cannot be default',
      rule3: 'other'
    });
  });

  it('nested array validation', () => {
    expect(validator(nestedArray, nestedArrayConfig)).toEqual({
      'users.1.id': 'required'
    });
    expect(validator({ users: 'test' }, nestedArrayConfig)).toEqual({
      users: 'type'
    });
  });
});

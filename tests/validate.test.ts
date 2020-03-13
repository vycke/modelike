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

const config = {
  type1: typeRule,
  type2: typeRule,
  required: requiredRule,
  nonexisting: requiredRule,
  message: customMessageRule,
  rule1: withRulesRule,
  rule2: withRulesRule2,
  rule3: withRulesRule,
  'nested.value': typeRule
};

const input = {
  type1: 'test',
  type2: 0,
  required: 'test',
  message: 0,
  rule1: 'test',
  rule2: '',
  rule3: '',
  nested: {
    value: 'test'
  }
};

describe('validator', () => {
  it('base validation', () => {
    expect(validator(input, config)).toEqual({
      type2: 'type',
      nonexisting: 'required',
      message: 'This is required',
      rule2: 'This cannot be default',
      rule3: 'other'
    });
  });
});

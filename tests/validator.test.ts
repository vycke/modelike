/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { validator } from '../src';
import { ErrorType, P, RuleType } from '../src/types';

function isDefault(value: P): boolean {
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
  type: RuleType.string,
};

const regexpRule = {
  type: RuleType.string,
  regexp: /test/g,
};

const requiredRule = {
  type: RuleType.string,
  required: true,
};

const customRule = {
  type: RuleType.string,
  required: true,
  custom: (v: any) => !isDefault(v),
};

const _config = {
  typecorrect: typeRule,
  typeerror: typeRule,
  requiredcorrect: requiredRule,
  requirederror: requiredRule,
  customcorrect: customRule,
  customerror: customRule,
  format: regexpRule,
  'nested.value': typeRule,
};

const _obj = {
  typecorrect: 'test',
  typeerror: 0,
  requiredcorrect: 'test',
  customcorrect: 'test',
  customerror: '',
  format: 'tast',
  nested: {
    value: 'test',
  },
};

describe('validator', () => {
  it('base validation', () => {
    expect(validator(_obj, _config)).toEqual({
      typeerror: ErrorType.type,
      requirederror: ErrorType.required,
      format: ErrorType.format,
      customerror: ErrorType.custom,
    });
  });
});

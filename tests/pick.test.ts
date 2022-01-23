import { requiredStringRule, pick } from '../src';

const _config = {
  required: requiredStringRule,
  'nested.required': requiredStringRule,
};

const _obj = {
  required: 'test',
  nonRequired: 'test',
  nested: {
    required: 'test',
    nonRequired: 'test',
  },
};

describe('pick', () => {
  it('simple pick', () => {
    expect(pick(_obj, _config)).toEqual({
      nested: {
        required: 'test',
      },
      required: 'test',
    });
  });
});

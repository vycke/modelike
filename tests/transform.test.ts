/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import transform from '../src/transform';

const simpleRule = {
  source: 'testA',
  target: 'testB'
};

const simpleNestedRule = {
  source: 'testA.testB.testC',
  target: 'testA.testB'
};

const simpleDoubleRule = [simpleRule, { source: 'testA', target: 'testC' }];

const simpleRuleSet = {
  source: ['testA', 'testB'],
  target: 'testC'
};

const reducerRule = {
  source: ['testA', 'testB'],
  target: 'testC',
  reducer: (m: any) => m.join(' ')
};

const arrayRule = {
  source: 'array',
  target: 'array',
  each: [
    {
      target: '_id',
      source: 'id'
    }
  ]
};

const input1 = {
  testA: 'test'
};

const input2 = {
  testC: 'test'
};

const input3 = {
  testA: 'test',
  testB: 'test'
};

const input4 = {
  testA: {
    testB: {
      testC: 'test'
    }
  }
};

const input5 = {
  array: [{ id: 1 }, { id: 2 }]
};

describe('deduce', () => {
  it('simple cases', () => {
    expect(transform(input1, [simpleRule])).toEqual({
      testB: 'test'
    });

    expect(transform(input2, [simpleRule])).toEqual({
      testC: undefined
    });

    expect(transform(input3, [simpleRuleSet])).toEqual({
      testC: ['test', 'test']
    });

    expect(transform(input3, [reducerRule])).toEqual({
      testC: 'test test'
    });

    expect(transform(input4, [simpleNestedRule])).toEqual({
      testA: { testB: 'test' }
    });
    expect(transform(input1, simpleDoubleRule)).toEqual({
      testB: 'test',
      testC: 'test'
    });

    expect(transform(input5, [arrayRule])).toEqual({
      array: [{ _id: 1 }, { _id: 2 }]
    });
  });
});

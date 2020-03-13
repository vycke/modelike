/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import deduce from '../src/deduce';

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

const normalisationInput = {
  users: [
    {
      id: 1,
      name: 'User 1',
      likes: [
        { id: 1, name: 'Like 1' },
        { id: 2, name: 'Like 2' }
      ]
    },
    {
      id: 2,
      name: 'User 2',
      likes: [
        { id: 1, name: 'Like 1' },
        { id: 3, name: 'Like 3' }
      ]
    }
  ]
};

const normalisationOutput = {
  users: [
    { id: 1, name: 'User 1', likes: [1, 2] },
    { id: 2, name: 'User 2', likes: [1, 3] }
  ],
  likes: [
    { id: 1, name: 'Like 1' },
    { id: 2, name: 'Like 2' },
    { id: 3, name: 'Like 3' }
  ]
};

const normalisationConfig = [
  { source: 'users', target: 'users' },
  {
    source: 'users.likes',
    target: 'users.likes',
    arrays: ['users']
    // reducer: (v) => v.map((l) => l.id)
  },
  { source: 'users.likes', target: 'likes' }
];

const denormalisationConfig = [
  { source: 'users', target: 'users' },
  {
    source: ['likes', 'users.likes'],
    target: 'users.likes',
    reducer: (v) => console.log(v)
  }
];

describe('deduce', () => {
  it('simple cases', () => {
    expect(deduce(input1, [simpleRule])).toEqual({
      testB: 'test'
    });

    expect(deduce(input2, [simpleRule])).toEqual({
      testC: undefined
    });

    expect(deduce(input3, [simpleRuleSet])).toEqual({
      testC: ['test', 'test']
    });

    expect(deduce(input3, [reducerRule])).toEqual({
      testC: 'test test'
    });

    expect(deduce(input4, [simpleNestedRule])).toEqual({
      testA: { testB: 'test' }
    });
    expect(deduce(input1, simpleDoubleRule)).toEqual({
      testB: 'test',
      testC: 'test'
    });
  });

  it('normalisation', () => {
    expect(deduce(normalisationInput, normalisationConfig)).toEqual(
      normalisationOutput
    );
  });

  it('denormalisation', () => {
    expect(deduce(normalisationOutput, denormalisationConfig)).toEqual(
      normalisationInput
    );
  });
});

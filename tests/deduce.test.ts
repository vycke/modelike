import deduce from '../deduce';

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
  reducer: (m) => m.join(' ')
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

it('deduce', () => {
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

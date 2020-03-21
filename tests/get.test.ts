import get from '../src/get';

const input = {
  first: { en: 'en1', nl: 'nl1' },
  second: { en: 'en2', nl: 'nl2' },
  third: { en: 'en3', nl: 'nl3' }
};

const path1 = 'first.en';
const path2 = 'fourth.nl';

describe('nestedProperties', () => {
  it('normal', () => {
    expect(get(input, path1)).toBe('en1');
    expect(get(input, path2)).toBe(undefined);
    expect(get(input, path2, 'nl4')).toBe('nl4');
    expect(get(input, '')).toEqual(input);
  });
});

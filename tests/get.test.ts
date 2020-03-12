import get from '../get';

const obj = {
  first: { en: 'en1', nl: 'nl1' },
  second: { en: 'en2', nl: 'nl2' },
  third: { en: 'en3', nl: 'nl3' }
};

const path1 = 'first.en'.split('.');
const path2 = 'fourth.nl'.split('.');

describe('nestedProperties', () => {
  it('normal', () => {
    expect(get(obj, path1)).toBe('en1');
    expect(get(obj, path2)).toBe(undefined);
  });

  it('empty', () => {
    expect(get(obj, [])).toEqual(obj);
    expect(get(obj, ''.split('.'))).toEqual(obj);
  });
});

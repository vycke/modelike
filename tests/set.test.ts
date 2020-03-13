import set from '../src/set';

const obj = {
  first: { en: 'en1', nl: 'nl1' },
  second: { en: 'en2', nl: 'nl2' },
  third: { en: 'en3', nl: 'nl3' }
};

const path1 = 'first.en';
const path2 = 'fourth.nl';

describe('nestedProperties', () => {
  it('advanced', () => {
    set(obj, path1, 'en2');
    set(obj, path2, 'nl4');

    expect(obj).toEqual({
      first: { en: 'en2', nl: 'nl1' },
      second: { en: 'en2', nl: 'nl2' },
      third: { en: 'en3', nl: 'nl3' },
      fourth: { nl: 'nl4' }
    });

    set(obj, '', '');
    expect(obj).toEqual({
      first: { en: 'en2', nl: 'nl1' },
      second: { en: 'en2', nl: 'nl2' },
      third: { en: 'en3', nl: 'nl3' },
      fourth: { nl: 'nl4' }
    });

    set(obj, '', '');
    expect(obj).toEqual(obj);
  });
});

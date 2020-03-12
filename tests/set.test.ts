import set from '../set';

const obj = {
  first: { en: 'en1', nl: 'nl1' },
  second: { en: 'en2', nl: 'nl2' },
  third: { en: 'en3', nl: 'nl3' }
};

const path1 = 'first.en'.split('.');
const path2 = 'fourth.nl'.split('.');

describe('nestedProperties', () => {
  it('advanced', () => {
    set(obj, path1, 'yay');
    set(obj, path2, 'yay');

    expect(obj).toEqual({
      first: { en: 'yay', nl: 'nl1' },
      second: { en: 'en2', nl: 'nl2' },
      third: { en: 'en3', nl: 'nl3' },
      fourth: { nl: 'yay' }
    });

    set(obj, [], 'yay');
    expect(obj).toEqual({
      first: { en: 'yay', nl: 'nl1' },
      second: { en: 'en2', nl: 'nl2' },
      third: { en: 'en3', nl: 'nl3' },
      fourth: { nl: 'yay' }
    });

    set(obj, null, 'yay');
    expect(obj).toEqual(obj);

    set(obj, path1.join('.'), 'yay');
    expect(obj).toEqual({
      first: 'yay',
      second: { en: 'en2', nl: 'nl2' },
      third: { en: 'en3', nl: 'nl3' },
      fourth: { nl: 'yay' }
    });
  });
});

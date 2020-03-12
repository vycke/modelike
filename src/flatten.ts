export function flatten(obj) {
  const output = {};

  if (typeof obj !== 'object' || obj === null) return output;

  function step(object, prev) {
    Object.entries(object).forEach(([k, v]) => {
      const key = prev ? prev + '.' + k : k;
      if (typeof v === 'object' && v !== null && Object.keys(v).length)
        return step(v, key);

      output[key] = v;
    });
  }

  step(obj);

  return output;
}

export function unflatten(obj) {
  const result = {};
  Object.entries(obj).forEach(([k, v]) => {
    const keys = k.split('.');
    keys.reduce(
      (r, e, j) =>
        r[e] ||
        (r[e] = isNaN(Number(keys[j + 1]))
          ? keys.length - 1 === j
            ? v
            : {}
          : []),
      result
    );
  });

  return result;
}

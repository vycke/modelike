import set from './set';
import get from './get';

export default function(obj, schema) {
  const newObj = {};

  schema.forEach((rule) => {
    let value;
    if (Array.isArray(rule.source)) value = rule.source.map((s) => get(obj, s));
    else value = get(obj, rule.source);

    if (rule.reducer) value = rule.reducer(value);
    set(newObj, rule.target, value);
  });

  return newObj;
}

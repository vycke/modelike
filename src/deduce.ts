import set from './set';
import get from './get';

export type Deduction = {
  source: string | string[];
  target: string;
  arrays?: string[];
  reducer?: Function;
};

export default function deduce(obj: object, schema: Deduction[]): object {
  const newObj = {};

  schema.forEach((d: Deduction) => {
    let value = Array.isArray(d.source)
      ? d.source.map((s: string) => get(obj, s))
      : get(obj, d.source);

    if (d.reducer) value = d.reducer(value);
    set(newObj, d.target, value);
  });

  return newObj;
}

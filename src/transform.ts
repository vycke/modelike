import set from './set';
import get from './get';

export type Deduction = {
  source: string | string[];
  target: string;
  reducer?: Function;
  each?: Deduction[];
};

export default function transform(obj: object, schema: Deduction[]): object {
  const newObj = {};

  schema.forEach((d: Deduction) => {
    let value = Array.isArray(d.source)
      ? d.source.map((s: string) => get(obj, s))
      : get(obj, d.source);

    if (d.reducer && Array.isArray(value)) value = d.reducer([...value]);
    if (Array.isArray(value) && d.each)
      value = value.map(({ ...v }) => transform(v, d.each as Deduction[]));

    set(newObj, d.target, value);
  });

  return newObj;
}

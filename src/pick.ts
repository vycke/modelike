import { O, Schema } from './types';
import { set, get } from './utils';

export function pick(obj: O, schema: Schema): O {
  const _obj = {};
  Object.keys(schema).forEach((key) => set(_obj, key, get(obj, key)));
  return _obj;
}

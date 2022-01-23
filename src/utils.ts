import { O, P } from './types';

// helper that checks if a value exists (not null and not undefined)
export function exists(value: P): boolean {
  return value !== undefined && value !== null;
}

// function to get value from tokenized path
export function get(obj: O, path: string): P {
  const tokens = path.split('.');
  return tokens.reduce(
    (o: P, k: string) =>
      o && typeof o === 'object' && exists((o as O)[k] as P)
        ? (o[k] as P)
        : undefined,
    obj
  );
}

// function to set nested value based on tokenized path
export function set(obj: O, path: string, val: P): O {
  if (path.length === 0) return obj;
  const _tokens = path.split('.');

  const _key = _tokens.pop();
  const _nested = _tokens.reduce(
    (o: { [key: string]: any }, k: string | number) => (o[k] = o[k] || {}),
    obj
  );

  if (typeof _key !== 'undefined') _nested[_key as string] = val;
  return obj;
}

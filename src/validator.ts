import { ErrorType, Rule, Schema, O, P, Errors } from './types';
import { exists, get } from './utils';

// function that validates a single value against a rule
function evaluate(value: P, rule: Rule, obj: O): unknown {
  let error: string | undefined;
  // property is required but does not exists
  if (rule.required && !exists(value)) error = ErrorType.required;
  // no need to continue if the value does not exists
  else if (!exists(value)) return;
  // property is of the wrong type, except for checking array types
  else if (typeof value !== rule.type) error = ErrorType.type;
  // regexp for string
  else if (
    rule.type === 'string' &&
    rule.regexp?.test(value as string) === false
  )
    error = ErrorType.format;
  // property does not apply to custom rule
  else if (rule.custom)
    error = !rule.custom(value, obj) ? ErrorType.custom : undefined;
  return error;
}

// Function that does the actual valudation of the schema
export function validator(obj: O, schema: Schema): Errors {
  const errors: Errors = {};

  Object.entries(schema).forEach(([key, rule]) => {
    const value = get(obj, key);
    const error = evaluate(value, rule, obj);
    if (error) errors[key] = error as ErrorType;
    if (error || !exists(value)) return;
  });

  return errors;
}

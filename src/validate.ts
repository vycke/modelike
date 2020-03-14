import get from './get';

type Primitive = number | string | boolean | object;
type TypedObject<T> = { [key: string]: T };
type Errors = TypedObject<string>;
type Rule = {
  type: string;
  required?: boolean;
  message?: string;
  rule?(v: Primitive): boolean;
  each?: string | Schema;
};
type Schema = TypedObject<Rule>;

// helper that checks if a value exists (not null and not undefined)
function exists(value: Primitive): boolean {
  return value !== undefined && value !== null;
}

// returns the message of a rule or a default value
function message(rule: Rule, def: string): string {
  return rule.message || def;
}

function evaluate(value: Primitive, rule: Rule): string | undefined {
  let error: string | undefined;
  // attribute is required but does not exists
  if (rule.required && !exists(value)) error = message(rule, 'required');
  // no need to continue if the value does not exists
  else if (!exists(value)) return;
  // attribute is of the wrong type, except for checking array types
  else if (typeof value !== rule.type && rule.type !== 'array')
    error = message(rule, 'type');
  // type checking for arrays
  else if (rule.type === 'array' && !Array.isArray(value))
    error = message(rule, 'type');
  // in case of primitives in the array, check them directly
  else if (rule.type === 'array' && typeof rule.each === 'string') {
    (value as Array<Primitive>).some((v) => typeof v !== rule.each) &&
      (error = message(rule, 'type'));
  }
  // attribute does not apply to custom rule
  else if (rule.rule && !rule.rule(value)) error = message(rule, 'other');
  return error;
}

export default function validate(obj: object, schema: Schema): Errors {
  const errors: Errors = {};

  Object.entries(schema).forEach(([key, rule]) => {
    const value = get(obj, key);
    const error = evaluate(value, rule);
    if (error) errors[key] = error;
    if (error || rule.type !== 'array' || !exists(value)) return;

    // in case of nested objects in array, recursively call this function
    if (typeof rule.each !== 'string')
      (value as Array<object>).forEach((v, i) => {
        const nestedErrors = validate(v, rule.each as Schema);
        Object.entries(nestedErrors).forEach(
          ([k, e]) => (errors[`${key}.${i}.${k}`] = e)
        );
      });
  });
  return errors;
}

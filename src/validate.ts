import get from './get';

type Primitive = number | string | boolean | object;
type Message = string;
type ValidationErrors = { [key: string]: string };

type Rule = {
  type: string;
  required?: boolean;
  message?: Message;
  rule?(v: Primitive): boolean;
  each?: Rule;
};

export type ValidationSchema = {
  [key: string]: Rule;
};

function exists(value: Primitive): boolean {
  return value !== undefined && value !== null;
}

export default function(
  obj: object,
  schema: ValidationSchema
): ValidationErrors {
  const errors: ValidationErrors = {};

  function evaluate(key: string, value: Primitive, rule: Rule): void {
    if (rule.required && !exists(value))
      errors[key] = rule.message || 'required';
    else if (typeof value !== rule.type) errors[key] = rule.message || 'type';
    else if (rule.rule && !rule.rule(value))
      errors[key] = rule.message || 'other';
  }

  Object.entries(schema).forEach(([key, rule]) => {
    const value = get(obj, key);
    evaluate(key, value, rule);
  });

  return errors;
}

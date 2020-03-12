import get from './get';

function exists(value) {
  return value !== undefined && value !== null;
}

export function isDefault(value) {
  const type = typeof value;

  switch (type) {
    case 'boolean':
      return value === false;
    case 'number':
      return value === 0;
    case 'string':
      return value === '';
    default:
      return true;
  }
}

export default function(obj, schema) {
  const errors = {};

  Object.entries(schema).forEach(([k, v]) => {
    const value = get(obj, k);

    if (v.required && !exists(value)) errors[k] = v.message || 'required';
    else if (v.type && typeof value !== v.type) errors[k] = v.message || 'type';
    else if (v.rule && !v.rule(value)) errors[k] = v.message || 'errors';
  });

  return errors;
}

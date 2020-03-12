export default function transform(obj, schema) {
  if (!schema) return obj;
  if (Array.isArray(obj)) return obj.map((o) => transform(o, schema));

  const newObj = {};

  Object.entries(schema).forEach(([k, v]) => {
    if (typeof obj[k] === 'undefined') return;
    if (typeof v !== 'object') newObj[k] = obj[k];
    else if (Array.isArray(obj[k]) && typeof v === 'object')
      newObj[k] = obj[k].map((o) => transform(o, v));
    else newObj[k] = transform(obj[k], v);
  });

  return newObj;
}

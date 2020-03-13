// Gets the nested value based on a tokenized string indicating the path of the
// object.(e.g. get(obj, "user.info.address"))
type Primitive = number | string | object | boolean;
export default function(obj: object, path: string, def?: Primitive): Primitive {
  if (!path || path === '') return obj;
  const tokens = path.split('.');

  return tokens.reduce(
    (o, k) => (o && o[k] !== undefined && o[k] !== null ? o[k] : def),
    obj
  );
}

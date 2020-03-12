// Gets the nested value based on a array of values indicating the path of the
// object.
// (e.g. getNestedObject(obj, ("user.info.address").split(".")))
export const get = (obj, path = '', def = undefined) => {
  if (!path) return obj;

  let newPath = path;

  if (typeof path === 'string') newPath = newPath.split('.');
  else if (!Array.isArray(newPath) || newPath.length === 0 || newPath[0] === '')
    return obj;
  return newPath.reduce(
    (o, k) => (o && typeof o[k] !== 'undefined' && o[k] !== null ? o[k] : def),
    obj
  );
};

export default get;

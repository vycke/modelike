// Gets the nested value based on a array of values indicating the path of the
// object.
// (e.g. getNestedObject(obj, ("user.info.address").split(".")))
export const set = (obj, path, val) => {
  if (!path) return obj;
  let newPath = path;

  if (typeof path === 'string') newPath = newPath.split('.');
  else if (!Array.isArray(newPath) || newPath.length === 0 || newPath[0] === '')
    return obj;

  const lastKey = newPath.pop();
  const lastObj = newPath.reduce((o, k) => (o[k] = o[k] || {}), obj);
  lastObj[lastKey] = val;
};

export default set;

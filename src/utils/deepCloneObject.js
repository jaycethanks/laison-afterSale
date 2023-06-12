export default function deepCloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    clone[key] = deepCloneObject(obj[key]);
  });

  return clone;
}

export default function (str, maxLength) {
  if (str !== undefined) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength - 3) + '...';
    }
  } else {
    return '';
  }
}

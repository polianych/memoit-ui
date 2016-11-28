export function buildQueryString(obj: Object, prefix = null): string {
  let str = [], p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p;
      let v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        buildQueryString(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

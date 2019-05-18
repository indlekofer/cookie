export const set = (name, value, days) => {
  let expires = '', date;
  if (days > 0) {
    date = new Date();
    date.setTime(date.getTime() + (days * 86400000)); //86400000 = 24 * 60 * 60 * 1000
    expires = '; expires=' + date.toGMTString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
};

export const get = (name) => {
  let nameEQ = name + '=',
    ca = decodeURIComponent(document.cookie).split(';');
  for (let i = 0, l = ca.length; i < l; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

export const getAll = () => {
  let r = {}, ca = decodeURIComponent(document.cookie).split(';');
  for (let i = 0, l = ca.length; i < l; i++) {
    //find space
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    let cIndex = c.indexOf('=');
    if (cIndex !== -1) {
      let key = c.substring(0, cIndex);
      if (key !== 'expires' && key !== 'path') {
        r[key] = c.substring(cIndex +1, c.length);
      }
    }
  }
  return r;
};

export const unset = (name) => {
  set(name, '', -1);
};

export default get;

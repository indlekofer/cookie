"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.unset = exports.getAll = exports.get = exports.set = void 0;

var set = function set(name, value, days) {
  var expires = '',
      date;

  if (days > 0) {
    date = new Date();
    date.setTime(date.getTime() + days * 86400000); //86400000 = 24 * 60 * 60 * 1000

    expires = '; expires=' + date.toGMTString();
  }

  document.cookie = name + '=' + value + expires + '; path=/';
};

exports.set = set;

var get = function get(name) {
  var nameEQ = name + '=',
      ca = decodeURIComponent(document.cookie).split(';');

  for (var i = 0, l = ca.length; i < l; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};

exports.get = get;

var getAll = function getAll() {
  var r = {},
      ca = decodeURIComponent(document.cookie).split(';');

  for (var i = 0, l = ca.length; i < l; i++) {
    //find space
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    var cIndex = c.indexOf('=');

    if (cIndex !== -1) {
      var key = c.substring(0, cIndex);

      if (key !== 'expires' && key !== 'path') {
        r[key] = c.substring(cIndex + 1, c.length);
      }
    }
  }

  return r;
};

exports.getAll = getAll;

var unset = function unset(name) {
  set(name, '', -1);
};

exports.unset = unset;
var _default = get;
exports["default"] = _default;
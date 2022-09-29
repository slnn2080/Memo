const template = require('art-template');

template.defaults.imports.classNameFilter = function (value) {
  if (value === 0) {
    return 'first';
  } else if (value === 1) {
    return 'second';
  } else if (value === 2) {
    return 'third'
  } else {
    return ''
  }
};

template.defaults.imports.dateFormat = function (value) {
  var d = new Date(value);
  var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return times
}
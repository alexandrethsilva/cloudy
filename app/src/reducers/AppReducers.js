import {trimRight} from 'lodash';

// Regex matching any JS file inside this folder which isn't the file itself or related to it.
const matchPattern: RegExp = /^\.\/(?!App)([a-z]+)\.js$/i;

const req: Function = require.context(
  '/', false, /^\.\/(?!App)([a-z]+)\.js$/i
);

export default req.keys().reduce((accumulator, key) => {
  const reducer = matchPattern.exec(key)[1];

  accumulator[trimRight(reducer, 'Reducer').toLowerCase()] = req(key).default;

  return accumulator;
}, {});

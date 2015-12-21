import {camelCase} from 'lodash';

/**
 * Here is our entry point to all our reducers within the app.
 * In a real world scenario this kind of file is very handy because it just
 * does the heavy lifting for us and we don't have to worry about creating
 * a new reference to every single reducer we create.
 * It also creates a rule for the name to reference the reducer in our code,
 * so it's a bit of a double-win.
 *
 * This regex matches any JS file inside this folder which isn't the
 * file itself or related to it - that is, starting with `App`.
 */

const matchPattern: RegExp = /^\.\/(?!App)([a-z]+)\.js$/i;

const req: Function = require.context(
  '/', false, /^\.\/(?!App)([a-z]+)\.js$/i
);

export default req.keys().reduce((accumulator, key) => {
  const reducer = matchPattern.exec(key)[1];

  accumulator[camelCase(reducer.replace('Reducer', ''))] = req(key).default;

  return accumulator;
}, {});

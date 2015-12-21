/**
 * The mother of all inits. This guy takes every init the `ActionCreators`
 * and triggers it.
 *
 * The regex matches any file with the name <any>ActionCreators.js
 */

const req = require.context(
  'actions', true, /^\.\/[a-z]+ActionCreators(\/index)?\.js$/i
);

const moduleInits = req
  .keys()
  .map(key => req(key).init)
  .filter(moduleInit => !!moduleInit);

export default function init() {
  return async (dispatch) => {
    await* moduleInits.map(moduleInit => dispatch(moduleInit()));
  };
}

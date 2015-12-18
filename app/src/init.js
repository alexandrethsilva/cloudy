//Matches any file with the name actionCreators.js
//or any JS file inside a folder called actionCreator with the name index.js
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

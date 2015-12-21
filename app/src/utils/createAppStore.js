import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';

/**
 * Here is the heart of our App. We create here our central store and
 * combine all our reducers in this central resource.
 * In case things look shady, to really understand it better I'd recommend
 * a read on Redux and all its beauty. (http://rackt.org/redux/index.html)
 */
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import appReducers from 'reducers/AppReducers';

export default function createAppStore(initialState) {
  let finalCreateStore = createStore;

  finalCreateStore = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(promiseMiddleware)
  )(finalCreateStore);

  return finalCreateStore(combineReducers(appReducers), initialState);
}

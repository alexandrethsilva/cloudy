import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';

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

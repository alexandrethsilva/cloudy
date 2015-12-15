import {createHistory} from 'history';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

import thunkMiddleware from 'redux-thunk';
// import {batchedUpdatesMiddleware} from 'redux-batched-updates';
import {reduxReactRouter} from 'redux-router';

import appRoutes from 'routes/AppRoutes';
import appReducers from 'reducers/AppReducers';

export default function createAppStore(initialState) {
  let finalCreateStore = createStore;

  finalCreateStore = compose(
    applyMiddleware(thunkMiddleware),
    reduxReactRouter({ routes: appRoutes, createHistory })
  )(finalCreateStore);

  return finalCreateStore(combineReducers(appReducers), initialState);
}

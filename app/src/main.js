import 'babel-polyfill';

import React from 'react';
import DOM from 'react-dom';
import {Provider} from 'react-redux';

import init from './init';
import createAppStore from 'utils/createAppStore';

import App from 'components/App';

import Logger from 'utils/logUtils';

async function initApp() {
  try {

    const store = createAppStore();

    await store.dispatch(init());

    const component = (
      <Provider store={store}><App /></Provider>
    );

    const container = document.getElementById('root');

    DOM.render(component, container);

  } catch (error) {
    Logger.error('There\'s a problem with the application.', error);
  }
}

initApp();

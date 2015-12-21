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

    /**
     * Here is where we create the main store, which in the Redux philosophy
     * is unique.
     */
    const store = createAppStore();

    /**
     * Here we dispatch it's first action, which is to start any ActionCreator
     * which itself has an init method available.
     * See more on the `init.js` file.
     */
    await store.dispatch(init());

    /**
     * Now we definer the root component, providing the store we just created
     * as its provider.
     * We also reference the main `App` component inside of it.
     * In case it was an application with multiple routes, here is where
     * we would define them through our router of choice. In this specific
     * case it wasn't necessary.
     */
    const component = (
      <Provider store={store}><App /></Provider>
    );

    /**
     * Finally we capture the root element of the page...
     */
    const container = document.getElementById('root');

    /**
     * ...and append our result to it.
     */
    DOM.render(component, container);

  } catch (error) {
    Logger.error('There\'s a problem with the application.', error);
  }
}

initApp();

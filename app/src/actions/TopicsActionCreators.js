import fetch from 'isomorphic-fetch';
import {createAction} from 'redux-act';

import Topic from 'models/Topic';

export const viewTopics = createAction('viewTopics');

export const fetchTopics = async () => {
  return await fetch('/api/topics.json')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Oh no! The request returned an error! Too bad...');
      }
      return response.json();
    })
    .then((results) => {
      return results.topics.map((data) => Topic(data)); // eslint-disable-line new-cap
    });
};

export function init() {
  return async (dispatch) => {
    dispatch(viewTopics(await fetchTopics()));
  };
}

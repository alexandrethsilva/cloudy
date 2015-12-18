import fetch from 'isomorphic-fetch';
import {createAction} from 'redux-act';

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
      return results;
    });
};

export function init() {
  return async (dispatch) => {
    const topics = await fetchTopics();
    dispatch(viewTopics(topics));
  };
}

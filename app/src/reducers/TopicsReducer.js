import {createReducer} from 'redux-act';
import * as actions from 'actions/TopicsActionCreators';

/**
 * Our reducer for the `TopicsCloud`.
 * Given a state and a list of Topics, returns a new state.
 */
export default createReducer({
  [actions.viewTopics]: (state, topics) => {
    return topics.sortBy(t => t.topicVolume()).reverse();
  },
}, null);

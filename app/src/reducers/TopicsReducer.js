import {createReducer} from 'redux-act';
import * as actions from 'actions/TopicsActionCreators';

export default createReducer({
  [actions.viewTopics]: (state, topics) => {
    return topics.sortBy(t => t.topicVolume()).reverse();
  },
}, null);

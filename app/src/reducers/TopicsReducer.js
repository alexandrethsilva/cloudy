import {createReducer} from 'redux-act';
import * as actions from 'actions/TopicsActionCreators';

export default createReducer({
  [actions.viewTopics]: (state, topic) => topic,
}, null);

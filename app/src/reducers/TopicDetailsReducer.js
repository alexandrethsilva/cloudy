import {createReducer} from 'redux-act';
import * as actions from 'actions/TopicDetailsActionCreators';

export default createReducer({
  [actions.displayTopicDetails]: (state, topic) => topic,
}, null);

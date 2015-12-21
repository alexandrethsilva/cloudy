import {createReducer} from 'redux-act';
import * as actions from 'actions/TopicDetailsActionCreators';

/**
 * Our reducer for the `TopicDetails`.
 * Given a state and a topic, returns a new state.
 */
export default createReducer({
  [actions.displayTopicDetails]: (state, topic) => topic,
}, null);

import {createReducer} from 'redux-act';
import * as actions from 'actions/TopicsCloudActionCreators';

/**
 * Our reducer for the `TopicsCloud`.
 * Given a state and a cloud, returns a new state.
 */
export default createReducer({
  [actions.displayTopicsCloud]: (state, cloud) => cloud,
}, null);

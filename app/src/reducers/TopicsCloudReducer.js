import {createReducer} from 'redux-act';
import * as actions from 'actions/TopicsCloudActionCreators';

export default createReducer({
  [actions.displayTopicsCloud]: (state, cloud) => cloud,
}, null);

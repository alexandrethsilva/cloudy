import 'styles/topicsCloud.scss';

import React, {Component} from 'react';
import TopicsCloudLayout from './TopicsCloudLayout';


/**
 * The `App` component itself is only a wrapper to any other components
 * we decide to create within our app. Here, it defines our `TopicsCloudLayout`
 * component as its only child.
 */
export default class App extends Component {
  render() {
    return (
      <TopicsCloudLayout/>
    );
  }
}

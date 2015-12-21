import React, {Component} from 'react';
import TopicsCloud from './TopicsCloud';
import TopicDetails from './TopicDetails';

/**
 * Our `TopicsCloudLayout` component is where we define our main
 * structure for the cloud component, acting as a wrapper for the two
 * independent components related to it: `TopicsCloud` and `TopicDetails`.
 */
export default class TopicsCloudLayout extends Component {
  render() {
    return (
      <div className="root__container">
        <h1 className="root__container__title">{'cloudy'}</h1>
        <TopicsCloud/>
        <TopicDetails/>
      </div>
    );
  }
}

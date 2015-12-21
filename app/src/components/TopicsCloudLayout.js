import React, {Component} from 'react';
import TopicsCloud from './TopicsCloud';
import TopicDetails from './TopicDetails';

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

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {topicColorGivenSentimentScore} from 'utils/topicUtils';

class App extends Component {
  static propTypes = {
    topics: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const {topics} = this.props;
    const cRadius = 6;

    const topicList = topics.length ?
      topics.map((topic) => {
        return (
          <p
            key={topic.topicId()}
            style={{
              'color': topicColorGivenSentimentScore(topic.topicSentimentScore()),
            }}>
            <span>
              <svg
                height={cRadius * 2}
                width={cRadius * 2}>
                <circle
                  cx={cRadius}
                  cy={cRadius}
                  r={cRadius}
                  fill={
                    topicColorGivenSentimentScore(topic.topicSentimentScore())
                  } />
              </svg>
            </span>
            {topic.topicSentimentScore()}
          </p>
        );
      }) :
      'The topics are loading...';

    return <div>{topicList}</div>;
  }
}

function selectTopics(store) {
  return {
    topics: store.topics ? store.topics : [],
  };
}

export default connect(selectTopics)(App);

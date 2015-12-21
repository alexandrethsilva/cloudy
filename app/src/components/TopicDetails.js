import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';

export default class TopicDetails extends Component {
  static propTypes = {
    topic: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  render() {
    const {topic} = this.props;

    const topicLabel = topic ? topic.topicLabel() : null;
    const topicVolume = topic ? topic.topicVolume() : null;
    const positiveMentions = topic ? topic.topicSentimentGivenType('positive') : null;
    const neutralMentions = topic ? topic.topicSentimentGivenType('neutral') : null;
    const negativeMentions = topic ? topic.topicSentimentGivenType('negative') : null;

    return topic ? (
      <div className="topic__details">
        <div className="topic__details__info">
          <h3>{`Information on ${topicLabel}`}</h3>
          <p>
            {'Total mentions:'} <strong>{topicVolume}</strong>
          </p>
          <p>
            {'Positive mentions:'} <strong className="topic__item__label--positive">
              {positiveMentions ? positiveMentions : 'N/A'}
            </strong>
          </p>
          <p>
            {'Neutral mentions:'} <strong className="topic__item__label--neutral">
              {neutralMentions ? neutralMentions : 'N/A'}
            </strong>
          </p>
          <p>
            {'Negative mentions:'} <strong className="topic__item__label--negative">
              {negativeMentions ? negativeMentions : 'N/A'}
            </strong>
          </p>
        </div>
      </div>
    ) : (
      <div className="topic__details">
        <div className="topic__details__empty">
          {'Choose one of the topics on the side to see more details'}
        </div>
      </div>
    );
  }
}

function selectTopicDetails(store) {
  return {
    topic: store.topicDetails ? store.topicDetails : null,
  };
}

export default connect(selectTopicDetails)(TopicDetails);

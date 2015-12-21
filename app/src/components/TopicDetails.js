import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';

/**
 * This component refers to the right panel where more detailed topic metadata
 * is displayed. It's defined and can be included or removed without any
 * side-effect on its surroundings.
 */
export default class TopicDetails extends Component {
  /**
   * Here we define conditions for the accepted PropTypes for this component.
   */
  static propTypes = {
    topic: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  render() {
    /**
     * In general, I prefer to define any use of methods from a model at the
     * top of a component render, so that anyone who's new to it can have an
     * overall idea of which functionalities this component depends on.
     * Plus, this provides the extra advantage of making a single calculation
     * in cases where the same information is referenced in multiple parts
     * of the rendering process.
     */
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

/**
 * Here we establish the connection between this component and our
 * central store, using the `connect` functionality from Redux.
 * The beauty of it is that it looks at information dispatched by any
 * component to the reducer of its interest, without depending on them
 * and without requiring specific properties to be passed.
 */
function selectTopicDetails(store) {
  return {
    topic: store.topicDetails ? store.topicDetails : null,
  };
}

/**
 * The connection is here, using the selector we defined above.
 */
export default connect(selectTopicDetails)(TopicDetails);

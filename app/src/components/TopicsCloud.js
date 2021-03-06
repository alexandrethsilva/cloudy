import {partial} from 'lodash';
import {Map, List, is} from 'immutable';

import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';

import {displayTopicDetails} from 'actions/TopicDetailsActionCreators';
import {displayTopicsCloud} from 'actions/TopicsCloudActionCreators';

import {
  calculateTopicListCoordinates,
  topicDisplayGivenSentimentScore,
} from 'utils/topic';

class TopicsCloud extends Component {
  /**
   * Here we define conditions for the accepted PropTypes for this component.
   */
  static propTypes = {
    dispatch: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    topics: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    topicsCloud: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidUpdate(prevProps) {
    /**
     * Here we evaluate changes that are meaningful to this component
     * and check if we should trigger a re-render or not.
     */
    const {topics} = this.props;

    /**
     * In this case, I'm specifically checking for changes in the topics
     * consumed by the `TopicsCloud`, to be trigger a new cloud calculation
     * whenever there are topics and they are not equal to the previous ones.
     */
    if (topics.size && !is(topics, prevProps.topics)) {
      this.calculateTopicsCloudLayout(topics);
    }
  }

  handleTopicClick(topicId) {
    /**
     * Here is where we handle the click on topics, creating a dispatch on
     * the Redux store, so that whoever is interested in this information
     * can have it. In our specific case, the `TopicDetails` component, but
     * notice that in no moment we have to make any explicit reference to it.
     * Oh, the beauty of truly independent components...
     */
    const {dispatch, topics} = this.props;

    dispatch(displayTopicDetails(topics.get(topicId)));
  }

  calculateTopicsCloudLayout(topics) {
    /**
     * Here is where the main topic positioning calculation takes place.
     * Given that I didn't want to reivent the wheel, a guy names Jason Davies
     * provides already a great collision detection mechanism on his cloud
     * generator (https://github.com/jasondavies/d3-cloud).
     * The only problem was that the implementation he made was to fit in
     * traditional documents, so to fit it to the unidirectional data flow
     * that I use here and keep things in a more pure way, I utilize only the
     * calculation part of his tool. Luckily he smartly provides an event
     * listener at the end of the calculation which provides me the finished
     * job. Thanks Jason!
     */
    const {dispatch} = this.props;

    calculateTopicListCoordinates(
      topics,
      {
        font: 'sans-serif',
        fontSizeDistributionList: List([10, 12, 14, 16, 18, 20]),
        padding: 15,
        random: () => 0.5,
        rotate: 0,
        size: [700, 300],
      },
      (calculatedTopics) => {
        dispatch(displayTopicsCloud(calculatedTopics));
      }
    );
  }

  renderTopicsCloudGivenCalculations(calculatedTopics) {
    const width = 700;
    const height = 300;

    const topicsListOutput = calculatedTopics.map((cloudTopic) => {
      const {
        topicId,
        topicLabel,
        topicScore,
        topicSize,
      } = cloudTopic;

      const topicSentiment = topicDisplayGivenSentimentScore(topicScore);

      const itemProps = {
        key: topicId,
        textAnchor: 'middle',
        transform: `translate(${cloudTopic.x}, ${cloudTopic.y})`,
        className: `topic__item__label topic__item__label--${topicSentiment}`,
        style: {
          fontSize: `${topicSize}px`,
        },
        onClick: partial(this.handleTopicClick.bind(this), topicId),
      };

      return <text {...itemProps}>{topicLabel}</text>;

    });

    return (
      <svg
        className="topic__cloud__area"
        height={height}
        width={width} >
        <rect
          height={height}
          width={width}
          x={0}
          y={0} />
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {topicsListOutput}
        </g>
      </svg>
    );
  }

  render() {
    /**
     * Here we check if the store already has any cloud for us to display
     * and in case it does we do it. Otherwise we display a friendly
     * `Cloud is being built` warning to our fellow users.
     */
    const {topicsCloud} = this.props;

    const cloudOutput = topicsCloud.length ?
      this.renderTopicsCloudGivenCalculations(topicsCloud) :
      'Cloud is being built';

    return (
      <div className="topic__cloud">
        <div className="topic__cloud__container">
          {cloudOutput}
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
function selectTopicsCloud(store) {
  return {
    topics: store.topics ? store.topics : Map(),
    topicsCloud: store.topicsCloud ? store.topicsCloud : [],
  };
}

/**
 * The connection is here, using the selector we defined above.
 */
export default connect(selectTopicsCloud)(TopicsCloud);

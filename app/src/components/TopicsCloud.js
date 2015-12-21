import cloud from 'd3-cloud';

import {partial} from 'lodash';
import {Map, List, is} from 'immutable';

import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';

import {displayTopicDetails} from 'actions/TopicDetailsActionCreators';
import {displayTopicsCloud} from 'actions/TopicsCloudActionCreators';

import {topicDisplayGivenSentimentScore} from 'utils/topicUtils';

class TopicsCloud extends Component {
  static propTypes = {
    dispatch: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    topics: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    topicsCloud: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidUpdate(prevProps) {
    const {topics} = this.props;

    if (topics.size && !is(topics, prevProps.topics)) {
      this.calculateTopicsCloudLayout(topics);
    }
  }

  handleTopicClick(topicId) {
    const {dispatch, topics} = this.props;

    dispatch(displayTopicDetails(topics.get(topicId)));
  }

  calculateTopicsCloudLayout(topics) {
    const {dispatch} = this.props;

    const fontSizeDistributionList = List([10, 12, 14, 16, 18, 20]);
    const fontSizeRange = (
      topics.first().topicVolume() - topics.last().topicVolume()
    ) / fontSizeDistributionList.size;

    const topicList = topics.toArray().map((topic) => {
      return {
        topicId: topic.topicId(),
        topicLabel: topic.topicLabel(),
        topicScore: topic.topicSentimentScore(),
        topicSize: fontSizeDistributionList
          .get(Math.floor(topic.topicVolume() / fontSizeRange) - 1),
      };
    });

    const layout = cloud()
      .font('Montserrat')
      .padding(10)
      .rotate(() => 0)
      .size([700, 400])
      .words(topicList)
      .text((topic) => topic.topicLabel)
      .random(() => 0.5)
      .fontSize((topic) => {
        return topic.topicSize;
      })
      .on('end', (calculatedTopics) => dispatch(displayTopicsCloud(calculatedTopics)));

    layout.start();
  }

  renderTopicsCloudGivenCalculations(calculatedTopics) {
    const width = 700;
    const height = 400;

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

      // if (selectedTopic === topicId) {
      //   itemProps.className += `topic__item__label--active`;
      // }

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
    const {topicsCloud} = this.props;

    return (
      <div className="topic__cloud">
        <div className="topic__cloud__container">
          {
            topicsCloud.length ? this.renderTopicsCloudGivenCalculations(topicsCloud) :
            'Cloud is being built'
          }
        </div>
      </div>
    );
  }
}

function selectTopicsCloud(store) {
  return {
    topics: store.topics ? store.topics : Map(),
    topicsCloud: store.topicsCloud ? store.topicsCloud : [],
  };
}

export default connect(selectTopicsCloud)(TopicsCloud);

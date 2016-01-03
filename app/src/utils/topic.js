/*@flow*/
import cloud from 'd3-cloud';
import {Map, List} from 'immutable';
import {isFunction} from 'lodash';

/**
 * General `Topic` utilities.
 */

export function calculateFontSizeRange(
  max: Number,
  min: Number,
  size: Number
): Number {
  return (max - min) / (size - 1);
}

export function convertTopicListToCloudFormat(
  topics: Map,
  fontSizeDistributionList: List,
  fontSizeRange: Number
): Array<Object> {
  return topics.toArray().map((topic) => {
    /**
     * Here is where we pick the size of interest to us and define which
     * information we want to pass onto Jason's positioning calculator.
     */
    return {
      topicId: topic.topicId(),
      topicLabel: topic.topicLabel(),
      topicScore: topic.topicSentimentScore(),
      topicSize: fontSizeDistributionList
        .get(Math.floor(topic.topicVolume() / fontSizeRange)),
    };
  });
}

export function calculateTopicListCoordinates(
  topics: List,
  options: Object,
  callback: Function
): void {
  /*+
   * Here we define the sizes we want to generate and make some base
   * calculations on which one to pick according to the volume of any
   * given topic.
  */
  const {
    font,
    fontSizeDistributionList,
    padding,
    rotate,
    size,
    random,
  } = options;

  const fontSizeRange = calculateFontSizeRange(
    topics.first().topicVolume(),
    topics.last().topicVolume(),
    fontSizeDistributionList.size
  );

  const topicList = convertTopicListToCloudFormat(
    topics,
    fontSizeDistributionList,
    fontSizeRange
  );

  const layout = cloud()
    .font(font)
    .fontSize((topic) => {
      return topic.topicSize;
    })
    .padding(padding)
    .random(random)
    .rotate(rotate)
    .size(size)
    .text((topic) => topic.topicLabel)
    .words(topicList)
    /**
     * Here is the catch. After all is done, we just retrieve the
     * information in a consumable way and dispatch it to our store.
     */
    .on('end', (result) => {
      if (isFunction(callback)) {
        callback(result);
      }
    });

  /**
   * This is the trigger to the calculations.
   */
  layout.start();
}

export function topicDisplayGivenSentimentScore(score: Number): String {
  if (score > 60) { return 'positive'; }
  if (score < 40) { return 'negative'; }
  return 'neutral';
}

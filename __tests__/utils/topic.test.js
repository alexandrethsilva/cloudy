import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import Topic from '../../app/src/models/Topic';
import {topicDisplayColorGivenSentimentScore} from '../../app/src/utils/topicUtils';

const topicsPath = path.join(__dirname, '..', '..', '/app/data/topics.json');
const topics =
  JSON.parse(fs.readFileSync(topicsPath, 'utf8')).topics
    .map((data) => Topic(data));

test('Topics', (parent) => {
  parent.test('Colors are provided correctly according to the topic score', (t) => {
    t.plan(topics.length);

    topics.forEach((topic) => {
      const score = topic.topicSentimentScore();

      if (score > 60) {
        t.is(
          topicDisplayColorGivenSentimentScore(score),
          'green',
          'Color matches the topic score - Positive'
        );
      } else if (score < 40) {
        t.is(
          topicDisplayColorGivenSentimentScore(score),
          'red',
          'Color matches the topic score - Negative'
        );
      } else {
        t.is(
          topicDisplayColorGivenSentimentScore(score),
          'gray',
          'Color matches the topic score - Neutral'
        );
      }
    });
  });

  parent.test('Volumes provided for the challenge are consistent', (t) => {
    t.plan(topics.length);

    topics.forEach((topic) => {
      t.isEqual(
        topic.topicVolume(),
        topic.topicCalculatedVolume(),
        'The provided and calculated volumes match'
      );
    });
  });
});

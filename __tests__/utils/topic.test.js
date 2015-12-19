import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import Topic from '../../app/src/models/Topic';
import {topicColorGivenSentimentScore} from '../../app/src/utils/topicUtils';

const topicsPath = path.join(__dirname, '..', '..', '/app/data/topics.json');
const topics =
  JSON.parse(fs.readFileSync(topicsPath, 'utf8')).topics
    .map((data) => Topic(data)); // eslint-disable-line new-cap

test('Topics', (parent) => {
  parent.test('Colors are provided correctly according to the topic score', (t) => {
    t.plan(topics.length);

    topics.forEach((topic) => {
      const score = topic.topicSentimentScore();

      if (score > 60) {
        t.equal(topicColorGivenSentimentScore(score), 'green');
      } else if (score < 40) {
        t.equal(topicColorGivenSentimentScore(score), 'red');
      } else {
        t.equal(topicColorGivenSentimentScore(score), 'gray');
      }
    });
  });

  parent.test('Volumes provided by Brandwatch are consistent', (t) => {
    t.plan(topics.length);

    topics.forEach((topic) => {
      t.equal(
        topic.topicVolume(),
        topic.topicCalculatedVolume()
      );
    });
  });
});

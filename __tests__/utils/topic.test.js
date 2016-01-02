import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import check from 'check-types';

import {isEqual, random} from 'lodash';
import {List} from 'immutable';

import Topic from '../../app/src/models/Topic';
import {topicDisplayGivenSentimentScore} from '../../app/src/utils/topicUtils';
import {getSamplesFromImmutableGivenSize} from '../../app/src/utils/genericUtils';


const setup = () => {

  const topicsPath = path.join(__dirname, '..', '..', '/app/data/topics.json');
  const topics =
    JSON.parse(fs.readFileSync(topicsPath, 'utf8')).topics
      .reduce((accumulator, data) => accumulator.push(Topic(data)), List());

  const fixtures = {
    testSampleSize: random(0, topics.size),
    topics: topics,
  };

  return fixtures;

};


test('Topic Utils', (parent) => {
  parent.test('topicDisplayGivenSentimentScore() ↓', (child) => {
    child.test('topicDisplayGivenSentimentScore() output', (assert) => {

      const {topics, testSampleSize} = setup();
      const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

      let actualOutput;
      let expectedOutput;

      let actualType;
      let expectedType;

      check.all(
        check.apply(
          sampleList.toArray(),
          (topic) => {
            const score = topic.topicSentimentScore();

            actualOutput = topicDisplayGivenSentimentScore(score);

            if (score > 60) {
              expectedOutput = 'positive';
            } else if (score < 40) {
              expectedOutput = 'negative';
            } else {
              expectedOutput = 'neutral';
            }

            if (!isEqual(actualOutput, expectedOutput)) {
              const topicId = topic.topicId();
              const topicLabel = topic.topicLabel();

              assert.comment(
                `Should have a label that matches the topic score
                ---
                  expected: ${expectedOutput}
                  actual:   ${actualOutput}
                ...`
              );
              assert.fail(
                `Error found on ${topicLabel} [ID: ${topicId}]`
              );
              return false;
            }
            return true;
          }
        ),
        check.apply(
          sampleList.toArray(),
          (topic) => {
            const score = topic.topicSentimentScore();

            const _topicDisplayGivenSentimentScore = topicDisplayGivenSentimentScore(score);

            actualType = check.string(_topicDisplayGivenSentimentScore);
            expectedType = true;

            if (!isEqual(actualType, expectedType)) {
              const topicId = topic.topicId();
              const topicLabel = topic.topicLabel();

              assert.comment(
                `Should return a String
                ---
                  expected: String
                  actual:   ${_topicDisplayGivenSentimentScore} [${typeof _topicDisplayGivenSentimentScore}]
                ...`
              );
              assert.fail(
                `Error found on ${topicLabel} [ID: ${topicId}]`
              );
              return false;
            }
            return true;
          }
        )
      );

      if (isEqual(actualOutput, expectedOutput)) {
        assert.pass(`Should have a label that matches the topic score`);
      }

      if (isEqual(actualType, expectedType)) {
        assert.pass(`Should return a String`);
      }

      assert.end();

    });
  });
});

import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import check from 'check-types';

import {random} from 'lodash';
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
  parent.test('topicDisplayGivenSentimentScore()', (child) => {
    child.test('topicDisplayGivenSentimentScore() output', (assert) => {

      const {topics, testSampleSize} = setup();
      const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

      sampleList.forEach((topic) => {
        const score = topic.topicSentimentScore();

        const actualOutput = topicDisplayGivenSentimentScore(score);
        let expectedOutput;

        const actualType = check.string(actualOutput);
        const expectedType = true;

        assert.is(
          actualType,
          expectedType,
          'Should return a string'
        );

        if (score > 60) {
          expectedOutput = 'positive';

          assert.is(
            actualOutput,
            expectedOutput,
            `The label should match the topic score [${score} >> ${actualOutput}]`
          );

        } else if (score < 40) {
          expectedOutput = 'negative';

          assert.is(
            actualOutput,
            expectedOutput,
            `The label should match the topic score [${score} >> ${actualOutput}]`
          );

        } else {
          expectedOutput = 'neutral';

          assert.is(
            actualOutput,
            expectedOutput,
            `The label should match the topic score [${score} >> ${actualOutput}]`
          );

        }
      });

      assert.end();

    });
  });
});

import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import check from 'check-types';

import {isEqual, random} from 'lodash';
import {List} from 'immutable';

import Topic from '../../app/src/models/Topic';
import {
  calculateFontSizeRange,
  convertTopicListToCloudFormat,
  calculateTopicListCoordinates,
  topicDisplayGivenSentimentScore,
} from '../../app/src/utils/topic';
import {getSamplesFromImmutableGivenSize} from '../../app/src/utils/generic';


const setup = (): Object => {

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
  parent.test('calculateFontSizeRange()', (assert) => {

    const maxVolume = 165;
    const minVolume = 1;
    const listSize = 5;

    const result = calculateFontSizeRange(
      maxVolume,
      minVolume,
      listSize
    );

    const actual = check.positive(result);
    const expected = true;

    assert.is(
      actual,
      expected,
      `Should return a Positive`
    );

    assert.end();

  });

  parent.test('convertTopicListToCloudFormat() output', (assert) => {

    const {topics, testSampleSize} = setup();
    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const fontSizeDistributionList = List([10, 12, 14, 16, 18, 20]);

    const fontSizeRange = calculateFontSizeRange(
      sampleList.first().topicVolume(),
      sampleList.last().topicVolume(),
      fontSizeDistributionList.size
    );

    const convertedTopicList = convertTopicListToCloudFormat(
      topics,
      fontSizeDistributionList,
      fontSizeRange
    );

    const actualType = check.array.of.object(convertedTopicList);
    const expectedType = true;

    assert.is(
      actualType,
      expectedType,
      `Should return an Array<Object>`
    );

    const actualChildren = check.all(
      check.apply(
        convertedTopicList,
        (item) => {

          const expectedItemMirror = {
            topicId: check.string,
            topicLabel: check.string,
            topicScore: check.maybe.greaterOrEqual(0),
            topicSize: check.maybe.positive,
          };

          const actualOutput = check.all(
            check.map(
              item,
              expectedItemMirror
            )
          );
          const expectedOutput = true;

          if (!isEqual(actualOutput, expectedOutput)) {
            assert.comment(
              `Each object in the array should have the appropriate shape
              ---
                expected: ${JSON.stringify(expectedItemMirror)}
                actual:   ${JSON.stringify(item)}
              ...`
            );
            assert.fail(
              `Error found on ${JSON.stringify(item)}`
            );
            return false;
          }
          return true;
        }
      )
    );
    const expectedChildren = true;

    if (isEqual(actualChildren, expectedChildren)) {
      assert.pass(`Each object in the array should have the appropriate shape`);
    }

    assert.end();

  });

  /**
   * This test is being currently skipped because the internal
   * method from the 'd3-cloud' lib depends on the document
   * being available for calculations and the current state of
   * tape-run apparently doesn't have support for ES6/2015,
   * so I decided to have it written for reference, but
   * make it run properly on a headless solution some other time.
   */
  parent.skip('calculateTopicListCoordinates() output', (assert) => {

    const {topics} = setup();

    const options = {
      font: 'sans-serif',
      fontSizeDistributionList: List([10, 12, 14, 16, 18, 20]),
      padding: 15,
      random: () => 0.5,
      rotate: 0,
      size: [700, 300],
    };

    const callback = (calculatedTopics) => {

      const actualType = check.array.of.object(calculatedTopics);
      const expectedType = true;

      assert.is(
        actualType,
        expectedType,
        `Should return an Array<Object>`
      );

      const actualChildren = check.all(
        check.apply(
          calculatedTopics,
          (item) => {

            const {
              font,
              padding,
              rotate,
            } = options;

            const expectedItemMirror = {
              topicId: check.string,
              topicLabel: check.string,
              topicScore: check.maybe.greaterOrEqual(0),
              topicSize: check.maybe.positive,
              text: check.string,
              font: check.equal(font),
              style: check.string,
              weight: check.string,
              rotate: check.equal(rotate),
              size: check.maybe.positive,
              padding: check.equal(padding),
              x: check.integer, // eslint-disable-line id-length
              y: check.integer, // eslint-disable-line id-length
              width: check.positive,
              height: check.positive,
              xoff: check.integer,
              yoff: check.integer,
              x1: check.integer,
              y1: check.integer,
              x0: check.integer,
              y0: check.integer,
              hasText: check.boolean,
            };

            const actualOutput = check.all();
            const expectedOutput = true;

            if (!isEqual(actualOutput, expectedOutput)) {
              assert.comment(
                `Each object in the array should have the appropriate shape
                ---
                  expected: ${JSON.stringify(expectedItemMirror)}
                  actual:   ${JSON.stringify(item)}
                ...`
              );
              assert.fail(
                `Error found on ${JSON.stringify(item)}`
              );
              return false;
            }
          }
        )
      );
      const expectedChildren = true;

      if (isEqual(actualChildren, expectedChildren)) {
        assert.pass(`Each object in the array should have the appropriate shape`);
      }

      assert.end();

    };

    calculateTopicListCoordinates(
      topics,
      options,
      callback
    );

  });

  parent.test('topicDisplayGivenSentimentScore() ⇢', (child) => {
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

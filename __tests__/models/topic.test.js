import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import check from 'check-types';
import {isEqual} from 'lodash';
import {List} from 'immutable';

import Topic from '../../app/src/models/Topic';
import {getSamplesFromImmutableGivenSize} from '../../app/src/utils/genericUtils';


const setup = () => {
  const topicsPath = path.join(__dirname, '..', '..', '/app/data/topics.json');
  const topics =
    JSON.parse(fs.readFileSync(topicsPath, 'utf8')).topics
      .reduce((accumulator, data) => accumulator.push(Topic(data)), List());

  const fixtures = {
    testSampleSize: 1, //random(0, topics.size),
    topics: topics,
  };

  return fixtures;
};


test('Topic Model', (parent) => {
  const {topics, testSampleSize} = setup();

  parent.test('topicId() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicId = topic.topicId();

      const actual = check.string(topicId);
      const expected = true;

      assert.equal(
        actual,
        expected,
        `Should return a string [>> ${topicId}]`
      );

    });

    assert.end();

  });

  parent.test('topicLabel() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicLabel = topic.topicLabel();

      const actual = check.string(topicLabel);
      const expected = true;

      assert.equal(
        actual,
        expected,
        `Should return a string [>> ${topicLabel}]`
      );

    });

    assert.end();

  });

  parent.test('topicVolume() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicVolume = topic.topicVolume();

      const actual = check.greaterOrEqual(topicVolume, 0);
      const expected = true;

      assert.equal(
        actual,
        expected,
        `Should return a either( 0 | positive ) [>> ${topicVolume}]`
      );

    });

    assert.end();

  });

  parent.test('topicType() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicType = topic.topicType();

      const actual = check.string(topicType);
      const expected = true;

      assert.equal(
        actual,
        expected,
        `Should return a string [>> ${topicType}]`
      );

    });

    assert.end();

  });

  parent.test('topicSentimentList() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicSentimentList = topic.topicSentimentList();

      const actual = check.object(topicSentimentList);
      const expected = true;

      assert.equal(
        actual,
        expected,
        `Should return an object`
      );

    });

    assert.end();

  });

  parent.test('topicSentimentGivenType() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const possibleTypes = [
      'positive',
      'neutral',
      'negative',
    ];

    sampleList.forEach((topic) => {
      possibleTypes.forEach((type) => {
        const topicSentimentGivenType = topic.topicSentimentGivenType(type);

        const actual = check.maybe.greaterOrEqual(topicSentimentGivenType, 0);
        const expected = true;

        assert.equal(
          actual,
          expected,
          `Should return a maybe( either( 0 | positive ) ) [>> ${topicSentimentGivenType}]`
        );
      });
    });

    assert.end();

  });

  parent.test('topicBurst() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicBurst = topic.topicBurst();

      const actual = check.greaterOrEqual(topicBurst, 0);
      const expected = true;

      assert.equal(
        actual,
        expected,
        `Should return either( 0 | positive ) [>> ${topicBurst}]`
      );

    });

    assert.end();

  });

  parent.test('topicVolumeListByDate() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {

          const topicVolumeListByDate = topic.topicVolumeListByDate({formatDate: false});

          const actualOut = check.array.of.object(topicVolumeListByDate);
          const expectedOut = true;

          if (!isEqual(actualOut, expectedOut)) {
            const topicId = topic.topicId();
            const topicLabel = topic.topicLabel();

            assert.comment(
              `Should return an array of objects
              ---
                expected: Array<Object>
                actual:   ${actualOut}
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

          const topicVolumeListByDate = topic.topicVolumeListByDate({formatDate: false});

          const actualOut = check.all(
            check.apply(
              topicVolumeListByDate,
              (item) => {

                const mappedResult = check.map(
                  item,
                  {
                    date: check.string,
                    volume: check.integer,
                  }
                );

                const childExpected = true;
                const childActual = check.all(
                  check.apply(
                    Object.keys(mappedResult),
                    (key) => mappedResult[key] === childExpected
                  )
                );

                if (!isEqual(childActual, childExpected)) {
                  const topicId = topic.topicId();
                  const topicLabel = topic.topicLabel();

                  const expectedItemMirror = {
                    date: 'String',
                    volume: 'Integer',
                  };

                  assert.comment(
                    `Each child of the objects array should have the appropriate shape
                    ---
                      expected: ${JSON.stringify(expectedItemMirror)}
                      actual:   ${JSON.stringify(item)}
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
          const expectedOut = true;

          if (isEqual(actualOut, expectedOut)) {
            assert.pass(`Each child of the objects array should have the appropriate shape`);
          }

        }
      )
    );

    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return an array of objects`);
    }

    assert.end();
  });

});

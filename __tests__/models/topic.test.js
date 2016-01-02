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
    testSampleSize: 5, //random(0, topics.size),
    topics: topics,
  };

  return fixtures;
};


test('Topic Model', (parent) => {
  const {topics, testSampleSize} = setup();

  parent.test('topicId() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {
          const topicId = topic.topicId();

          const actualOut = check.string(topicId);
          const expectedOut = true;

          if (!isEqual(actualOut, expectedOut)) {
            const topicLabel = topic.topicLabel();

            assert.comment(
              `Should return a String
              ---
                expected: string
                actual:   ${topicId} [${typeof topicLabel}]
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
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return a String`);
    }

    assert.end();

  });

  parent.test('topicLabel() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {
          const topicLabel = topic.topicLabel();

          const actualOut = check.string(topicLabel);
          const expectedOut = true;

          if (!isEqual(actualOut, expectedOut)) {
            const topicId = topic.topicId();

            assert.comment(
              `Should return a String
              ---
                expected: string
                actual:   ${topicLabel} [${typeof topicLabel}]
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
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return a String`);
    }

    assert.end();

  });

  parent.test('topicVolume() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {
          const topicVolume = topic.topicVolume();

          const actualOut = check.greaterOrEqual(topicVolume, 0);
          const expectedOut = true;

          if (!isEqual(actualOut, expectedOut)) {
            const topicId = topic.topicId();
            const topicLabel = topic.topicLabel();

            assert.comment(
              `Should return an Either[0, Positive]
              ---
                expected: Either[0, Positive]
                actual:   ${topicVolume} [${typeof topicVolume}]
              ...`
            );
            assert.fail(
              `Error found on ${topicLabel} [ID: ${topicId}]`
            );
            return false;
          }
        }
      )
    );
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return an Either[0, Positive]`);
    }

    assert.end();

  });

  parent.test('topicType() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {
          const topicType = topic.topicType();

          const actualOut = check.string(topicType);
          const expectedOut = true;

          if (!isEqual(actualOut, expectedOut)) {
            const topicId = topic.topicId();
            const topicLabel = topic.topicLabel();

            assert.comment(
              `Should return a String
              ---
                expected: String
                actual:   ${topicType} [${typeof topicType}]
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
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return a String`);
    }

    assert.end();

  });

  parent.test('topicSentimentList() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {
          const topicSentimentList = topic.topicSentimentList();

          const actualOut = check.object(topicSentimentList);
          const expectedOut = true;

          if (!isEqual(actualOut, expectedOut)) {
            const topicId = topic.topicId();
            const topicLabel = topic.topicLabel();

            assert.comment(
              `Should return an Object
              ---
                expected: Object
                actual:   ${JSON.stringify(topicSentimentList)} [${typeof topicSentimentList}]
              ...`
            );
            assert.fail(
              `Error found on ${topicLabel} [ID: ${topicId}]`
            );
            return false;
          }
        }
      )
    );
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return an Object`);
    }

    assert.end();

  });

  parent.test('topicSentimentGivenType() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {
          const possibleTypes = [
            'positive',
            'neutral',
            'negative',
          ];

          const actualOut = check.all(
            check.apply(
              possibleTypes,
              (type) => {
                const topicSentimentGivenType = topic.topicSentimentGivenType(type);

                const typeActual = check.maybe.greaterOrEqual(topicSentimentGivenType, 0);
                const typeExpected = true;

                if (!isEqual(typeActual, typeExpected)) {
                  const topicId = topic.topicId();
                  const topicLabel = topic.topicLabel();

                  assert.comment(
                    `Should return a Maybe[Either[0, Positive]]
                    ---
                      expected: Maybe[Either[0, Positive]]
                      actual:   ${topicSentimentGivenType} [${typeof topicSentimentGivenType}]
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

          if (!isEqual(actualOut, expectedOut)) {
            return false;
          }
          return true;
        }
      )
    );
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return a Maybe[Either[0, Positive]]`);
    }

    assert.end();

  });

  parent.test('topicBurst() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {
          const topicBurst = topic.topicBurst();

          const actualOut = check.greaterOrEqual(topicBurst, 0);
          const expectedOut = true;

          if (!isEqual(actualOut, expectedOut)) {
            const topicId = topic.topicId();
            const topicLabel = topic.topicLabel();

            assert.comment(
              `Should return an Either[0, Positive]
              ---
                expected: Either[0, Positive]
                actual:   ${topicBurst} [${typeof topicBurst}]
              ...`
            );
            assert.fail(
              `Error found on ${topicLabel} [ID: ${topicId}]`
            );
            return false;
          }
        }
      )
    );
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return an Either[0, Positive]`);
    }

    assert.end();

  });

  parent.test('topicVolumeListByDate() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    let childrenActual;
    let childrenExpected;

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

                childrenActual = check.all(
                  check.map(
                    item,
                    {
                      date: check.string,
                      volume: check.integer,
                    }
                  )
                );
                childrenExpected = true;

                if (!isEqual(childrenActual, childrenExpected)) {
                  const topicId = topic.topicId();
                  const topicLabel = topic.topicLabel();

                  const expectedItemMirror = {
                    date: 'String',
                    volume: 'Integer',
                  };

                  assert.comment(
                    `Each object in the array should have the appropriate shape
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

          if (!isEqual(actualOut, expectedOut)) {
            return false;
          }

          return true;

        }
      )
    );
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return an Array<Object>`);
    }

    if (isEqual(childrenActual, childrenExpected)) {
      assert.pass(`Each object in the array should have the appropriate shape`);
    }

    assert.end();
  });

  parent.test('topicVolumeByPageType() output', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    let childrenActual;
    let childrenExpected;

    const actual = check.all(
      check.apply(
        sampleList.toArray(),
        (topic) => {

          const topicVolumeByPageType = topic.topicVolumeByPageType();

          const actualOut = check.object(topicVolumeByPageType);
          const expectedOut = true;

          if (!isEqual(actualOut, expectedOut)) {
            const topicId = topic.topicId();
            const topicLabel = topic.topicLabel();

            assert.comment(
              `Should return an Object
              ---
                expected: Object
                actual:   ${topicVolumeByPageType} [${typeof topicVolumeByPageType}]
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

          const topicVolumeByPageType = topic.topicVolumeByPageType();

          const expectedVolumeByPageTypeMirror = {
            blog: check.greaterOrEqual(0),
            facebook: check.greaterOrEqual(0),
            forum: check.greaterOrEqual(0),
            general: check.greaterOrEqual(0),
            image: check.greaterOrEqual(0),
            news: check.greaterOrEqual(0),
            review: check.greaterOrEqual(0),
            twitter: check.greaterOrEqual(0),
            video: check.greaterOrEqual(0),
          };

          childrenActual = check.all(
            check.map(
              topicVolumeByPageType,
              expectedVolumeByPageTypeMirror
            )
          );
          childrenExpected = true;

          if (!isEqual(childrenActual, childrenExpected)) {
            const topicId = topic.topicId();
            const topicLabel = topic.topicLabel();

            assert.comment(
              `The object should have the appropriate shape
              ---
              expected: ${JSON.stringify(expectedVolumeByPageTypeMirror)}
              actual:   ${JSON.stringify(topicVolumeByPageType)}
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
    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should return an Object`);
    }

    if (isEqual(childrenActual, childrenExpected)) {
      assert.pass(`The object should have the appropriate shape`);
    }

    assert.end();

  });

});

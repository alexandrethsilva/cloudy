import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import check from 'check-types';

import {isEqual} from 'lodash';
import {List} from 'immutable';

import Topic from '../../app/src/models/Topic';


const setup = (): Object => {
  const topicsPath = path.join(__dirname, '..', '..', '/app/data/topics.json');
  const topicsFile = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
  const topics =
    topicsFile.topics
      .reduce((accumulator, data) => accumulator.push(Topic(data)), List());

  const fixtures = {
    topicsFile,
    topics,
  };

  return fixtures;
};

test('Topics Data', (parent) => {
  parent.test('Data format', (assert) => {

    const {topicsFile} = setup();

    assert.doesNotThrow(() => {
      try {
        JSON.parse(topicsFile);
      } catch (error) {
        return error;
      }
    }, 'Should be a valid JSON');

    assert.end();

  });

  parent.test('Volumes output', (assert) => {

    const {topics} = setup();

    const actual = check.all(
      check.apply(
        topics.toArray(),
        (topic) => {

          const actualOut = topic.topicVolume();
          const expectedOut = topic.topicCalculatedVolume();

          if (!isEqual(actualOut, expectedOut)) {
            const topicId = topic.topicId();
            const topicLabel = topic.topicLabel();

            assert.comment(
              `Should have matching calculated and provided volumes
              ---
                expected: ${expectedOut}
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
      )
    );

    const expected = true;

    if (isEqual(actual, expected)) {
      assert.pass(`Should have matching calculated and provided volumes`);
    }

    assert.end();
  });
});

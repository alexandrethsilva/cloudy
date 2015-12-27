import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import {random} from 'lodash';
import {List} from 'immutable';

import Topic from '../../app/src/models/Topic';
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

test('Topic Model', (parent) => {
  const {topics, testSampleSize} = setup();

  parent.test('topicId() output type is "string"', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicId = topic.topicId();

      const actual = typeof topicId;
      const expected = 'string';

      assert.equal(
        actual,
        expected,
        `${topicId} is of type ${actual}`
      );

    });

    assert.end();

  });

  parent.test('topicLabel() output type is "string"', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicLabel = topic.topicLabel();

      const actual = typeof topicLabel;
      const expected = 'string';

      assert.equal(
        actual,
        expected,
        `${topicLabel} is of type ${actual}`
      );

    });

    assert.end();

  });

  parent.test('topicVolume() output type is "number"', (assert) => {

    const sampleList = getSamplesFromImmutableGivenSize(topics, testSampleSize);

    sampleList.forEach((topic) => {

      const topicVolume = topic.topicVolume();

      const actual = typeof topicVolume;
      const expected = 'number';

      assert.equal(
        actual,
        expected,
        `${topicVolume} is of type ${actual}`
      );

    });

    assert.end();

  });
});

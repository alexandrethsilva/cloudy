import fs from 'fs';
import path from 'path';

import test from 'blue-tape';
import {List} from 'immutable';

import Topic from '../../app/src/models/Topic';


const setup = () => {
  const topicsPath = path.join(__dirname, '..', '..', '/app/data/topics.json');
  const topics =
    JSON.parse(fs.readFileSync(topicsPath, 'utf8')).topics
      .reduce((accumulator, data) => accumulator.push(Topic(data)), List());

  const fixtures = {
    topics: topics,
  };

  return fixtures;
};

test('Topics Data', (parent) => {
  parent.test('Volumes provided for the challenge are consistent', (assert) => {

    const {topics} = setup();

    topics.forEach((topic) => {
      const actual = topic.topicVolume();
      const expected = topic.topicCalculatedVolume();

      assert.isEqual(
        actual,
        expected,
        `The actual (${actual}) and expected (${expected}) volumes match`
      );
    });

    assert.end();
  });
});

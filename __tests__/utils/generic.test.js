import test from 'blue-tape';

import {random} from 'lodash';
import {List, Set} from 'immutable';

import {getSamplesFromImmutableGivenSize} from '../../app/src/utils/genericUtils';


const setup = (randomSampleSize: Number) => {
  let index = 0;

  let fixtures = { // eslint-disable-line prefer-const
    referenceImmutableList: List(),
    referenceImmutableSet: Set(),
  };

  while (index <= randomSampleSize) {

    fixtures.referenceImmutableList = fixtures.referenceImmutableList.push(`item${index}`);
    fixtures.referenceImmutableSet = fixtures.referenceImmutableSet.add(`item${index}`);

    ++index;
  }

  return fixtures;
};

test('Generic Utils', (parent) => {

  parent.test('getSamplesFromImmutableGivenSize()', (child) => {
    const immutableSampleSize = random(0, 20);
    const sampleSize = random(0, immutableSampleSize);

    child.test('Using a List', (assert) => {
      const {referenceImmutableList} = setup(immutableSampleSize);

      const actualType = List.isList(referenceImmutableList);
      assert.ok(actualType, 'Should return another List');

      const actualSize = getSamplesFromImmutableGivenSize(
        referenceImmutableList,
        sampleSize
      ).size;
      const expectedSize = sampleSize;

      assert.isEqual(
        actualSize,
        expectedSize,
        `The List size (${actualSize}) should match the requested (${expectedSize})`
      );

      assert.end();

    });

    child.test('Using a Set', (assert) => {
      const {referenceImmutableSet} = setup(immutableSampleSize);

      const actualType = Set.isSet(referenceImmutableSet);
      assert.ok(actualType, 'Should return another Set');

      const actualSize = getSamplesFromImmutableGivenSize(
        referenceImmutableSet,
        sampleSize
      ).size;
      const expectedSize = sampleSize;

      assert.isEqual(
        actualSize,
        expectedSize,
        `The Set size (${actualSize}) should match the requested (${expectedSize})`
      );

      assert.end();
    });

  });

});

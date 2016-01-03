import test from 'blue-tape';
import check from 'check-types';

import {random} from 'lodash';
import {List, Set} from 'immutable';

import {getSamplesFromImmutableGivenSize} from '../../app/src/utils/generic';


const setup = (randomSampleSize: Number): Object => {
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

  parent.test('getSamplesFromImmutableGivenSize() ⇢', (child) => {
    const immutableSampleSize = random(0, 20);
    const sampleSize = random(0, immutableSampleSize);

    child.test('getSamplesFromImmutableGivenSize() output using a List', (assert) => {
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
        `The sample size should match the requested [${sampleSize} >> ${actualSize}]`
      );

      const negativeInput = -1;
      const actualSizeWhenNegative = check.zero(
          getSamplesFromImmutableGivenSize(
          referenceImmutableList,
          negativeInput
        ).size
      );
      const expectedZeroWhenNegative = true;

      assert.isEqual(
        actualSizeWhenNegative,
        expectedZeroWhenNegative,
        `The sample should be empty when provided with a negative number [${negativeInput} >> 0]`
      );

      assert.end();

    });

    child.test('getSamplesFromImmutableGivenSize() output using a Set', (assert) => {
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
        `The sample size should match the requested [${sampleSize} >> ${actualSize}]`
      );

      const negativeInput = -1;
      const actualSizeWhenNegative = check.zero(
          getSamplesFromImmutableGivenSize(
          referenceImmutableSet,
          negativeInput
        ).size
      );
      const expectedZeroWhenNegative = true;

      assert.isEqual(
        actualSizeWhenNegative,
        expectedZeroWhenNegative,
        `The sample should be empty when provided with a negative number [${negativeInput} >> 0]`
      );

      assert.end();
    });

  });

});

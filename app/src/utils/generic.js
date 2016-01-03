/*@flow*/
import {sample} from 'lodash';
import {List, Set} from 'immutable';

export function getSamplesFromImmutableGivenSize(immutable: (List|Set), size: Number) {
  if (List.isList(immutable)) {
    return List(sample(immutable.toArray(), size));
  } else if (Set.isSet(immutable)) {
    return Set(sample(immutable.toArray(), size));
  }
  throw new Error('The object provided has to be either an Immutable List or Set');
}

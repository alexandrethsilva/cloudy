import fetch from 'isomorphic-fetch';

export default function init() {
  return fetch('/api/topics.json').then(async (topics) => topics);
}

export function topicDisplayColorGivenSentimentScore(score) {
  if (score > 60) { return 'green'; }
  if (score < 40) { return 'red'; }
  return 'gray';
}

export function topicDisplayGivenSentimentScore(score) {
  if (score > 60) { return 'positive'; }
  if (score < 40) { return 'negative'; }
  return 'neutral';
}

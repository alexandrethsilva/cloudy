
/**
 * General `Topic` utilities.
 */
export function topicDisplayGivenSentimentScore(score) {
  if (score > 60) { return 'positive'; }
  if (score < 40) { return 'negative'; }
  return 'neutral';
}

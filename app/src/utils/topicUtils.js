export function topicColorGivenSentimentScore(score) {
  if (score > 60) { return 'green'; }
  if (score < 40) { return 'red'; }
  return 'gray';
}

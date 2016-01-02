import moment from 'moment';

/**
 * On this small Topics model I had the initial intention of
 * definining a wide range of functionality, so that I could use it
 * on additional features, like graphs and so on. Unfortunately, there
 * was not enough time for doing all of it.
 * Still, I'm leaving additional functionality here so that it can be seen.
 *
 *
 * Also, a key point here that I'd like to mention is that, as much as classes
 * in JS are cool, composition is still cooler. Now, in this case we're not
 * in need to compose this component with any other given that
 * 1) It's quite unique and...
 * 2) We don't have any other model in this small app to compose with. :D
 *
 * What's more important is really creating all models in a consistent way.
 * So here we do this. We create a function which returns an object with all
 * the methods we'd like to use.
 * As the cherry on the pie this provides actual privacy for our properties
 * whereas in classes it's not really possible.
 */
export default function Topic(source) {
  const topicId = () => source.id;
  const topicLabel = () => source.label;
  const topicVolume = () => source.volume;
  const topicType = () => source.type;
  const topicSentimentList = () => source.sentiment;
  const topicSentimentGivenType = (type) => topicSentimentList()[type];
  const topicSentimentScore = () => source.sentimentScore;
  const topicBurst = () => source.burst;
  // Let's avoid the infamous boolean trap
  const topicVolumeListByDate = ({formatDate = true, customFormat}) => {
    return source.days.map((entry) => {
      const {date, volume} = entry;

      return {
        date: formatDate ?
          moment().format(
            date,
            customFormat ?
              customFormat :
              null
            ) :
          date,
        volume,
      };
    });
  };

  const topicVolumeByPageType = () => source.pageType;

  const topicCalculatedVolume = () => {
    const pages = topicVolumeByPageType();
    const pageKeys = Object.keys(pages); // eslint-disable-line new-cap

    return pageKeys.reduce((volume, key) => {
      return volume + pages[key];
    }, 0);
  };

  const topicQueryList = () => source.queries;

  return {
    topicId,
    topicLabel,
    topicVolume,
    topicCalculatedVolume,
    topicType,
    topicSentimentList,
    topicSentimentGivenType,
    topicSentimentScore,
    topicBurst,
    topicVolumeListByDate,
    topicVolumeByPageType,
    topicQueryList,
  };
}

import moment from 'moment';

export default function Topic(source) {
  const topicId = () => source.id;
  const topicLabel = () => source.label;
  const topicVolume = () => source.volume;
  const topicType = () => source.type;
  const topicSentimentList = () => source.sentiment;
  const topicSentimentGivenType = (type) => topicSentimentList[type];
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

  const topicVolumeGivenPageType = (pageType) => topicVolumeByPageType[pageType];

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
    topicVolumeGivenPageType,
    topicQueryList,
  };
}

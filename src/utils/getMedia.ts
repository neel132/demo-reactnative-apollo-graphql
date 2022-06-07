const _getMedia = (media, type) => {
  switch (type) {
    case 'thumbnail':
      return media?.formats.thumbnail;
    case 'small':
      return media?.formats.small;
    case 'medium':
      return media?.formats.medium;
    case 'large':
      return media?.formats.large;

    default:
      return media?.formats.medium;
  }
};

const __getMedia = (media, type) => {
  return _getMedia(media, type) || _getMedia(media, 'small');
};
const getMedia = (media, type) => {
  return (
    __getMedia(media, type) || {
      url: 'https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?size=338&ext=jpg&ga=GA1.2.1006130201.1639267200',
    }
  );
};

export default getMedia;

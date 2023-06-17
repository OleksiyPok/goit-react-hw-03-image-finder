import PropTypes from 'prop-types';

import { Li, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webImage, description, largeImage }) => {
  return (
    <Li className="gallery-item">
      <Img src={webImage} alt={description} />
    </Li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  description: PropTypes.string,
  largeImage: PropTypes.string.isRequired,
};

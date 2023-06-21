import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';

import { Ul } from './ImageGallery.styled';

const ImageGallery = ({ gallery }) => {
  const galleryItems = gallery;

  return (
    <Ul className="gallery">
      {galleryItems.map(item => (
        <ImageGalleryItem
          key={item.id}
          webImage={item.webformatURL}
          description={item.tags}
          largeImage={item.largeImageURL}
        ></ImageGalleryItem>
      ))}
    </Ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = { gallery: PropTypes.array.isRequired };

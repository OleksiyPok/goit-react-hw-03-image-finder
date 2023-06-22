import { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

import { Li, Img } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webImage, description, largeImage } = this.props;
    const showModal = this.state.showModal;

    return (
      <Li className="gallery-item">
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImage={largeImage}
            description={description}
          ></Modal>
        )}
        <Img src={webImage} alt={description} onClick={this.toggleModal} />
      </Li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  description: PropTypes.string,
  largeImage: PropTypes.string.isRequired,
};

import { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDownEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDownEscape);
  }

  handleKeyDownEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, description, children } = this.props;
    return createPortal(
      <Overlay className="modal__backdrop" onClick={this.handleBackdropClick}>
        <ModalDiv className="modal__content">
          {children}
          <img src={largeImage} alt={description} />
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string,
};

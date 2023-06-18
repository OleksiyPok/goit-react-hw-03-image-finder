import { Component } from 'react';
// import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';

class Modal extends Component {
  state = { isOpen: false };

  render() {
    return (
      <Overlay className="modal__backdrop">
        <ModalDiv className="modal__content">{this.props.children}</ModalDiv>
      </Overlay>
    );
  }
}

// const Modal = ({ children }) => {
//   return (
//     <Overlay className="modal__backdrop">
//       <ModalDiv className="modal__content">{children}</ModalDiv>
//     </Overlay>
//   );
// };

export default Modal;

import PropTypes from 'prop-types';

import { ButtonEl } from './Button.styled';

const Button = ({ loadMore }) => {
  return <ButtonEl onClick={loadMore}>More</ButtonEl>;
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

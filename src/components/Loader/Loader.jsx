// import PropTypes from 'prop-types';

import { Blocks } from 'react-loader-spinner';

// import { Loader } from './Loader.styled';

const Loader = () => {
  return (
    <Blocks
      visible={true}
      height="40"
      width="40"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
    />
  );
};

export default Loader;

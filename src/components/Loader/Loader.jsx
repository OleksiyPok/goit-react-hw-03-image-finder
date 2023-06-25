import { Blocks } from 'react-loader-spinner';
import { Overlay } from './Loader.styled';

const Loader = () => {
  return (
    <Overlay>
      <Blocks
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperClassName="blocks-wrapper"
      />
    </Overlay>
  );
};

export default Loader;

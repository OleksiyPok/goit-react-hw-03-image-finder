import { Blocks } from 'react-loader-spinner';

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

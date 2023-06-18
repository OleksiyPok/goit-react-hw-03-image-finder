import { Component } from 'react';
// import { Blocks } from 'react-loader-spinner';

// import ApiService from 'services';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
// import ImageGalleryItem from 'components/ImageGalleryItem';
// import Button from 'components/Button';

import images from 'db/images.json';

// import { AppContainer } from './App.styled';

// let apiService = new ApiService();

class App extends Component {
  state = {
    isLoading: false,
    data: '',
  };

  // getSearchQuery = searchQuery => {
  //   console.log('searchQuery:', searchQuery);
  //   this.setState({ data: searchQuery });
  // };

  // async getImages(searchQuery) {
  //   try {
  //     console.log('images:', images);
  //     // const responseData = await apiService.getData('cat');
  //     // console.log('responseData:', responseData);
  //     // this.setState({ data: responseData });
  //   } catch {}
  // }

  render() {
    // this.getImages('cat');
    return (
      <div>
        <Searchbar>Searchbar</Searchbar>
        <ImageGallery gallery={images}>ImageGallery</ImageGallery>
        {/* <Button>Button</Button> */}
      </div>
    );
  }
}

export default App;

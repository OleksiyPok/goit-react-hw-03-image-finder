import { Component } from 'react';
// import { Blocks } from 'react-loader-spinner';

import ApiService from 'services';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

// import Button from 'components/Button';

import { AppContainer } from './App.styled';

let apiService = new ApiService();

class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    gallery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery &&
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.doRequest(this.state.searchQuery);
    }
  }

  setSearchQuery = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  async doRequest(searchQuery) {
    try {
      const responseData = await apiService.getData(searchQuery);
      this.setState({ gallery: responseData, searchQuery: '' });
    } catch {}
  }

  render() {
    const gallery = this.state.gallery;

    return (
      <AppContainer>
        <Searchbar setQuery={this.setSearchQuery}>Searchbar</Searchbar>
        {gallery && <ImageGallery gallery={gallery}>ImageGallery</ImageGallery>}
      </AppContainer>
    );
  }
}

export default App;

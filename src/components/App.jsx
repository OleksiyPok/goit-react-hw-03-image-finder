import { Component } from 'react';
// import { Blocks } from 'react-loader-spinner';

import ApiService from 'services';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { AppContainer } from './App.styled';

let apiService = new ApiService();

class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    gallery: '',
    currentPage: 1,
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

  handleLoadMore = () => {};

  async doRequest(searchQuery) {
    try {
      this.setState({ isLoading: true });
      const responseData = await apiService.getData(searchQuery);
      this.setState({ gallery: responseData, searchQuery: '' });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading, gallery } = this.state;
    return (
      <AppContainer>
        <Searchbar setQuery={this.setSearchQuery} />
        {gallery && <ImageGallery gallery={gallery} />}
        {!isLoading && gallery && <Button loadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}

        <Loader />
      </AppContainer>
    );
  }
}

export default App;

import { Component } from 'react';

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
    totalImages: 0,
    imagesPerPage: 12,
    totalPages: 0,
    gallery: [],
    isShowButton: false,
  };

  handleOnSearch = currentSearchQuery => {
    this.setState({ isLoading: true });

    if (currentSearchQuery === '') {
      this.setState({
        searchQuery: '',
        gallery: '',
        totalImages: '',
        totalPages: '',
        isShowButton: false,
      });
    } else if (currentSearchQuery !== this.state.searchQuery) {
      this.doRequest(currentSearchQuery);
    }

    this.setState({ isLoading: false });
  };

  handleLoadMore = () => {
    this.setState({ isLoading: true });

    const currentPage = apiService.getCurrentPage();
    const totalPages = this.state.totalPages;
    const currentSearchQuery = this.state.searchQuery;

    if (currentPage < totalPages) {
      apiService.incrementPage();

      if (currentSearchQuery === '') {
        this.setState({
          searchQuery: '',
          gallery: [],
          totalImages: '',
          totalPages: '',
          isShowButton: false,
        });
      } else {
        this.doRequest(currentSearchQuery);
      }
    } else {
      this.setState({ isShowButton: false });

      this.setState({ isLoading: false });
    }
  };

  async doRequest(searchQuery) {
    try {
      const responseData = await apiService.getData(searchQuery);

      const totalImages = responseData.total;
      const imagesPerPage = apiService.perPage;
      const totalPages = Math.floor(totalImages / imagesPerPage);
      const newGallery = responseData.hits;
      const prevSearchQuery = this.state.searchQuery;

      this.setState({
        searchQuery: searchQuery,
        totalImages: totalImages,
        totalPages: totalPages,
      });

      if (searchQuery === prevSearchQuery) {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...newGallery],
          isShowButton: true,
        }));
      } else {
        this.setState({
          gallery: newGallery,
          isShowButton: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading, gallery, isShowButton } = this.state;

    return (
      <AppContainer>
        <Searchbar onClickSearch={this.handleOnSearch} />
        {gallery && <ImageGallery gallery={gallery} />}
        {isShowButton && gallery && <Button loadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}
      </AppContainer>
    );
  }
}

export default App;

import { Component } from 'react';

import { getData, IMAGES_PER_PAGE } from 'services';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { AppContainer } from './App.styled';

class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    currentPage: 1,
    totalPages: 0,
    gallery: [],
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      const currentSearchQuery = this.state.searchQuery;
      const currentPage = this.state.currentPage;

      if (currentSearchQuery === '') {
        this.setState({
          searchQuery: '',
          isLoading: false,
          currentPage: 1,
          totalPages: 0,
          gallery: [],
        });
      }

      if (currentSearchQuery !== '') {
        this.setState({
          isLoading: true,
        });
        this.doRequest(currentSearchQuery, currentPage);
      }
    }
  }

  handleOnSearch = currentSearchQuery => {
    if (currentSearchQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery: currentSearchQuery,
        gallery: [],
        currentPage: 1,
      });
    }
  };

  handleLoadMore = () => {
    const { currentPage, totalPages } = this.state;

    if (currentPage < totalPages) {
      this.setState(({ currentPage }) => ({
        currentPage: currentPage + 1,
      }));
    }
  };

  async doRequest(searchQuery, page) {
    try {
      const responseData = await getData(searchQuery, page);

      const totalImages = responseData.total;
      const totalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);
      const newGallery = responseData.hits;

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...newGallery],
        totalPages: totalPages,
        isLoading: false,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { searchQuery, isLoading, gallery, totalPages, currentPage } =
      this.state;

    const isShowGallery = Boolean(gallery.length);
    const isShowButton = isShowGallery && currentPage !== totalPages;

    return (
      <AppContainer>
        <Searchbar
          onClickSearch={this.handleOnSearch}
          oldSearchQuery={searchQuery}
        />
        {isShowGallery && <ImageGallery gallery={gallery} />}
        {isShowButton && <Button loadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}
      </AppContainer>
    );
  }
}

export default App;

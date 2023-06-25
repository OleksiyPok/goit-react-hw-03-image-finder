import { Component } from 'react';

import { Api } from 'services';
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
          currentPage: 1,
          totalPages: 0,
          gallery: [],
        });
      }

      if (currentSearchQuery !== '') {
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
    // if (!searchQuery) {
    //   console.log('no search');
    //   return;
    // }

    this.setState({
      isLoading: true,
    });

    try {
      const responseData = await Api.getData(searchQuery, page);
      console.log('responseData:', responseData);

      const totalImages = responseData.total;
      const totalPages = Math.ceil(totalImages / Api.IMAGES_PER_PAGE);
      const newGallery = responseData.hits;

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...newGallery],
        totalPages: totalPages,
      }));
    } catch (error) {
      return console.log(error.message);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { isLoading, gallery, totalPages, currentPage } = this.state;

    const isShowGallery = Boolean(gallery.length);
    const isShowButton = isShowGallery && currentPage !== totalPages;

    return (
      <AppContainer>
        <Searchbar onClickSearch={this.handleOnSearch} />
        {isShowGallery && <ImageGallery gallery={gallery} />}
        {isShowButton && <Button loadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}
      </AppContainer>
    );
  }
}

export default App;

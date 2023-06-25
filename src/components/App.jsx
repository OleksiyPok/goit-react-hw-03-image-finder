import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      const { searchQuery, currentPage } = this.state;
      this.doRequest(searchQuery, currentPage);
    }
  }

  handleOnSearch = currentSearchQuery => {
    if (currentSearchQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery: currentSearchQuery,
        gallery: [],
        currentPage: 1,
      });
    } else if (currentSearchQuery === '') {
      toast.error(`Enter a search string`);
    } else {
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

  async doRequest(searchQuery, currentPage) {
    if (!searchQuery) {
      toast.error(`Enter a search string!`);
      return;
    }

    if (currentPage === this.state.totalPages) {
      toast.info(`This is the last page`);
    }

    this.setState({
      isLoading: true,
    });

    try {
      const responseData = await Api.getData(searchQuery, currentPage);

      const newGallery = responseData.hits;

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...newGallery],
      }));

      if (currentPage === 1) {
        const imagesPerPage = newGallery.length;
        const totalImages = responseData.total;
        const totalPages = Math.ceil(totalImages / imagesPerPage);

        if (newGallery.length === 0) {
          toast.error(`No images found for your request!`);
        } else {
          toast.success(`Found ${totalImages} images matching your request`);
        }

        this.setState({
          totalPages: totalPages,
        });
      }
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

    const toastParams = {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: true,
      newestOnTop: false,
      closeOnClick: true,
      pauseOnHover: true,
    };

    return (
      <AppContainer>
        <Searchbar onClickSearch={this.handleOnSearch} />
        {isShowGallery && <ImageGallery gallery={gallery} />}
        {isShowButton && <Button loadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}

        <ToastContainer {...toastParams} />
      </AppContainer>
    );
  }
}

export default App;

import { Component } from 'react';
// import { Blocks } from 'react-loader-spinner';

import ApiService from 'services';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
// import Button from 'components/Button';

// import images from 'db/imagesDog.json';

// import { AppContainer } from './App.styled';

let apiService = new ApiService();
const query = 'cat';

class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    gallery: '',
    showModal: false,
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

  showGallery = s => {
    console.log(s);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const gallery = this.state.gallery;

    return (
      <div>
        <Searchbar setQuery={this.setSearchQuery}>Searchbar</Searchbar>

        {showModal && (
          <Modal>
            <button type="button" onClick={this.toggleModal}>
              Close modal
            </button>
          </Modal>
        )}

        <button type="button" onClick={() => this.doRequest(query)}>
          Get gallery
        </button>

        <button type="button" onClick={() => this.showGallery(gallery)}>
          Show gallery
        </button>

        {/* <ImageGallery gallery={images}>ImageGallery</ImageGallery> */}
        {gallery && <ImageGallery gallery={gallery}>ImageGallery</ImageGallery>}

        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>

        {/* <Button onClick={this.toggleModal}/> */}
      </div>
    );
  }
}

export default App;

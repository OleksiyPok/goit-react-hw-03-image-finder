import { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value;
    this.setState({ searchQuery: searchQuery });
    console.log('this.state.searchQuery:', this.state.searchQuery);
    // this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <Header className="searchbar">
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <SearchButton type="submit" className="button">
            {/* <SearchLabel className="button-label">Search</SearchLabel> */}
          </SearchButton>

          <SearchInput
            className="input"
            type="text"
            name="searchQuery"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func,
// };

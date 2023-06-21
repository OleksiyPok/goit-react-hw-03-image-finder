import { Component } from 'react';
// import PropTypes from 'prop-types';

import { BsSearch } from 'react-icons/bs';

import {
  Header,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  // state = {
  //   searchQuery: '',
  // };

  componentDidUpdate(prevProps, prevState) {
    // console.log('Searchbar - componentDidUpdate');
  }

  componentDidMount() {
    // console.log('Searchbar - componentDidMount');
  }

  componentWillUnmount() {
    // console.log('Searchbar - componentWillUnmount');
  }

  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value
      .trim()
      .toLowerCase();
    // this.setState({ searchQuery: searchQuery });
    this.props.onClickSearch(searchQuery);
    // e.currentTarget.elements.searchQuery.value = '';
  };

  render() {
    return (
      <Header className="searchbar">
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <SearchButton type="submit" className="button">
            <BsSearch width="16" height="16" />
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

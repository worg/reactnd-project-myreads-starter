import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
import { EmptyArr } from './constants'

export class SearchForm extends Component {
  componentDidMount() {
    const { query, handleSearch } = this.props;
    if (query !== '') {
      handleSearch({ target: { value: query }});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { query, history } = nextProps;
    if (query !== '' && query !== this.props.query) {
      history.replace(`/search/${query}`)
    }
  }

  render() {
    const {
      query,
      books,
      handleSearch,
      clearSearch,
      updateShelf,
    } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link onClick={clearSearch} className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              defaultValue={query}
              onChange={handleSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((b, i) => (
              <li key={i}>
                <BookItem book={b} onChange={updateShelf} />
              </li>
            ))}
            {(books.length < 1 && books !== EmptyArr && query !== '') && (
              <h4>
                Sorry we didn't found any book matching
                your query :(
              </h4>
            )}
            {books === EmptyArr && (
              <h4>
                Finding a nice read for you…
              </h4>
            )}
          </ol>
        </div>
      </div>
    );
  }

}

SearchForm.propTypes = {
  query: PropTypes.string,
  updateShelf: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  query: '',
};

export default SearchForm;

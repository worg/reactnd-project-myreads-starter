import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';

const SearchForm = ({ query, books, handleSearch, updateShelf }) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link className='close-search' to='/'>Close</Link>
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
      </ol>
    </div>
  </div>
);

SearchForm.propTypes = {
  query: PropTypes.string,
  updateShelf: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  query: '',
};

export default SearchForm;

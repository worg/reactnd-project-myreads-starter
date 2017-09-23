import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import SearchForm from './SearchForm';
import BookDetails from './BookDetails';
import { EmptyArr } from './constants';
import './App.css';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: EmptyArr,
      filtered: EmptyArr,
      searchQuery: '',
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  updateShelf = (e) => {
    const { 
      target: { dataset: data, value }
    } = e;
  
    BooksAPI.update({ id: data.id }, value).then(r => {
      // currentBook = this.state.books.
      this.setState(state => ({
        books: state.books.map(b => {
          if (b.id === data.id) {
            b.shelf = value;
          }
          return b;
        })
      }));
    });
  }

  handleSearch = (e) => {
    const { target: { value } } = e;
    this.performSearch(value);
  }

  performSearch = debounce(searchQuery => {
    if (searchQuery === '') {
      return this.clearSearch();
    }

    const inShelf = this.state.books.map(b => b.id);
    this.setState({ searchQuery }, () => {
      BooksAPI.search(searchQuery, 100).then(result => {
        let filtered = result;
        if (result.error) {
          filtered = EmptyArr;
        }

        filtered = filtered.map(r => {
          const index = inShelf.indexOf(r.id);
          if (index > -1) {
            return this.state.books[index];
          }

          return r;
        });
        this.setState({ filtered });
      });
    });
  }, 200, { leading: false, trailing: true })

  clearSearch = () => {
    this.setState({
      filtered: EmptyArr,
      searchQuery: '',
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList books={this.state.books} updateShelf={this.updateShelf} />
        )}/>
        <Route path='/search/:query?' render={({ match, history }) => {
          const { params: { query } } = match;
          return (
            <SearchForm
              history={history}
              books={this.state.filtered}
              query={this.state.searchQuery || query}
              updateShelf={this.updateShelf}
              handleSearch={this.handleSearch}
              clearSearch={this.clearSearch} />
          );
        }}/>
        <Route path='/book/:id'
        render={({ match }) => {
          const { params: { id } } = match;
          const { books } = this.state;
          const book = books.filter(b => b.id === id);
          return book.length > 0 ? (
            <BookDetails
              book={book[0]}
              updateShelf={this.updateShelf}
            />
          ) : (
            <div className='book-detail'>
              <Link className='close-search' to='/'>Back</Link>
              <h1>
                {books !== EmptyArr ? 'No book found' : 'Loading…'}
              </h1>
            </div>
          );
        }}
        />
      </div>
    );
  }
}

export default BooksApp;

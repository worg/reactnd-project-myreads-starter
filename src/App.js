import React from 'react'
import { Route } from 'react-router-dom'
import debounce from 'lodash.debounce'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchForm from './SearchForm'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      filtered: [],
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
    console.warn('E:', value);
    this.performSearch(value);
  }

  performSearch = debounce(searchQuery => {
    this.setState({ searchQuery }, () => {
      BooksAPI.search(searchQuery, 10).then(result => {
        console.warn('filtered', result);
        let filtered = result;
        if (result.error) {
          filtered = result.items;
        }

        this.setState({ filtered });
      });
    });
  }, 200, { leading: false, trailing: true })

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList books={this.state.books} updateShelf={this.updateShelf} />
        )}/>
        <Route path='/search/:query?' render={({ match }) => (
          <SearchForm
            books={this.state.filtered}
            query={match.params.query}
            updateShelf={this.updateShelf}
            handleSearch={this.handleSearch} />
        )}/>
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchForm from './SearchForm'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList books={this.state.books} updateShelf={this.updateShelf} />
        )}/>
        <Route path='/search/:query' render={SearchForm}/>
      </div>
    )
  }
}

export default BooksApp

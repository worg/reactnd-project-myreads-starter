import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchForm from './SearchForm'
import { EmptyArr } from './constants'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: EmptyArr,
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
      console.warn('Books: ', books);
    });
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList books={this.state.books}/>
        )}/>
        <Route path='/search' render={SearchForm}/>
      </div>
    )
  }
}

export default BooksApp

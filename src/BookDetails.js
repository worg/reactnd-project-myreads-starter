import React from 'react';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
import { getShelfTitle } from './utils';

export default ({ book, updateShelf }) => (
  <div className='book-detail'>
    <Link className='close-search' to='/'>Close</Link>
    <h3>{getShelfTitle(book.shelf)}: {book.title}</h3>
    <div className='book-item'>
      <BookItem book={book} onChange={updateShelf}/>
    </div>
    <p className='book-detail-description'>
      {book.description}
    </p>
  </div>
);

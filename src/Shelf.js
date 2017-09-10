import React from 'react';
import BookItem from './BookItem';
import { EmptyArr } from './constants';

export default ({ title, books, updateShelf }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books === EmptyArr && (
          <div className='loading'>Loading data…</div>
        )}
        {(books !== EmptyArr && books.length < 1) && (
          <div className='empty-shelf'>No books here :(</div>
        )}
        {books.map((b, i) => (
          <li key={i}>
            <BookItem book={b} onChange={updateShelf} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

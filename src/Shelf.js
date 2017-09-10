import React from 'react';
import BookItem from './BookItem';

export default ({ title, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.length < 1 && (
          <div className='empty-shelf'>No books found :(</div>
        )}
        {books.map((b, i) => (
          <li key={i}>
            <BookItem book={b} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

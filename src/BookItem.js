import React from 'react';

export default ({ book, onChange }) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
      <div className="book-shelf-changer">
        <select
          onChange={onChange}
          data-id={book.id}
          defaultValue={book.shelf || 'none'}>
          <option value="none" disabled>Move to…</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
  </div>
);

import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

const getShelfTitle = (id) => {
  switch (id) {
    case 'currentlyReading': 
      return 'Currently Reading';
    case 'wantToRead': 
      return 'Want to Read';
    case 'read': default:
      return 'Read';
  }
};


export default ({ books }) => {
  const shelves = books.reduce((p, c) => {
    p[c.shelf].push(c);
    return p;
  }, {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  });

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map(s => (
            <Shelf key={s} title={getShelfTitle(s)} books={shelves[s]} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
}

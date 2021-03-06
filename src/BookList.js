import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import { EmptyArr } from './constants';
import { getShelfTitle } from './utils';


export default ({ books, updateShelf }) => {
  const shelves = books.reduce((p, c) => {
    if (c.shelf === 'none') {
      return p;
    }
    
    p[c.shelf] = p[c.shelf].concat(c);
    return p;
  }, {
    currentlyReading: EmptyArr,
    wantToRead: EmptyArr,
    read: EmptyArr,
  });

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map(s => (
            <Shelf
              key={s}
              title={getShelfTitle(s)}
              books={shelves[s]}
              updateShelf={updateShelf} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
};

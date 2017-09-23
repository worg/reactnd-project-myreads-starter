export const getShelfTitle = (id) => {
  switch (id) {
    case 'currentlyReading': 
      return 'Currently Reading';
    case 'wantToRead': 
      return 'Want to Read';
    case 'read': default:
      return 'Read';
  }
};

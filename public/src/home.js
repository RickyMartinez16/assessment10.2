function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books){
  let filterArray = books.filter((book) => book.borrows[0].returned === false);
  return filterArray.length;
}


//getMostCommonGenres
//It returns an array containing five objects or fewer 
// that represents the most common occurring genres, 
// ordered from most common to least.

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const commonArray = [];
  bookGenres.map((genre) => {
    const genreLocation = commonArray.findIndex((element) => element.name === genre);
    if (genreLocation > 0){
      commonArray[genreLocation].count = commonArray[genreLocation].count + 1;
    } else {
      commonArray.push({name:genre, count:1});
    }
  });
  commonArray.sort((a, b) => b.count - a.count);
  if (commonArray.length > 5){
    return commonArray.slice(0, 5);
  }
  return commonArray;
}


//books
// {
//   "id": "5f4471327864ee880caf5afc",
//   "title": "reprehenderit quis laboris adipisicing et",
//   "genre": "Poetry",
//   "authorId": 20,
//   "borrows": [
//     {
//       "id": "5f446f2e2a4fcd687493a775",
//       "returned": false
//     },
//     {
//       "id": "5f446f2ebe8314bcec531cc5",
//       "returned": true
//     },
//     {
//       "id": "5f446f2ea508b6a99c3e42c6",
//       "returned": true
//     }
//   ]
// }



//getMostPopularBooks
//It returns an array containing five objects or fewer 
//that represents the most popular books in the library. 
//Popularity is represented by the number of times a book has been borrowed.


function getMostPopularBooks(books, count = 5) {
  const borrows = books.map(book =>({name:book.title, count:book.borrows.length}));
  borrows.sort((a,b) => b.count - a.count);
  return borrows.slice(0,count);
}

// getMostPopularAuthors
// It returns an array containing five objects or fewer 
// that represents the most popular authors whose books have been checked out the most. 
// Popularity is represented by finding all of the books written by the author 
// and then adding up the number of times those books have been borrowed.


function getMostPopularAuthors(books, authors) {
  const authorList = books.reduce((acc, book) => { 
    const { authorId, borrows } = book;
    const authorObj = authors.find(author => author.id === authorId);
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    const count = borrows.length;
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      authExists.count += count;
    } else {
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    
    return acc;
  }, []);

  const sortedAuthorList = authorList.sort((a, b) => b.count - a.count);
  const topFive = sortedAuthorList.slice(0, 5);
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

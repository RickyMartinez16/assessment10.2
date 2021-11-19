

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}


function sortAccountsByLastName(accounts) {
  return accountsByLastName = accounts.sort((nameA, nameB) => 
    nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1);
}



// getTotalNumberOfBorrows
// It returns a _number_ that represents the number of times the account's ID 
// appears in any book's `borrows` array.
 //if the account id appears in the borrows array, how many times?

 function getTotalNumberOfBorrows(account, books) {
  const { id: accId } = account;
  return books.reduce((accumulator, book) => {
    return (accumulator + book.borrows.filter(borrow => borrow.id === accId).length);
  }, 0); 
}


function getBooksPossessedByAccount(account, books, authors) {
  const booksCheckedOutByAccount = books.reduce((acc, book) => {
    const latestBorrow = book.borrows[0];
    if(latestBorrow.returned === false && latestBorrow.id === account.id) {
      const { authorId } = book;
      const author = authors.find(auth => auth.id === authorId);
      book.author = author;
      acc.push(book);
    }
    return acc;
  }, []);
  return booksCheckedOutByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

//accounts
// {
//   "id": "5f446f2ecfaf0310387c9603",
//   "name": {
//     "first": "Esther",
//     "last": "Tucker"
//   },
//   "picture": "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
//   "age": 25,
//   "company": "ZILLACON",
//   "email": "esther.tucker@zillacon.me",
//   "registered": "Thursday, May 28, 2015 2:51 PM"
// }

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
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}


function partitionBooksByBorrowedStatus(books)
  { 
    const borrowedBooks = books.filter(book => !book.borrows[0].returned);
    const returnedBooks = books.filter(book => book.borrows[0].returned);
    const allBooks = [borrowedBooks, returnedBooks];
    return allBooks;
}



function findBorrowerHelper(accountId, accounts){
  const foundBorrower = accounts.find((account) => account.id === accountId);
  return foundBorrower;
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  book.borrows.forEach((borrow) => {
    const { id: accountId} = borrow;
    const account = findBorrowerHelper(accountId, accounts);
    borrowers.push({...borrow, ...account});
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

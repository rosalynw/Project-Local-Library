function findAuthorById(authors, id) {
  const foundAuthorId = authors.find((author) => author.id === id);
  return foundAuthorId;
}

function findBookById(books, id) {
  const foundBookId = books.find((book) => book.id === id);
  return foundBookId;
}

//return one array with two arrays inside
//seperate book objects by return status
function partitionBooksByBorrowedStatus(books) {
  const borrowed = []
  const returned = []
  for(let i = 0; i < books.length; i++) {
    if(books[i].borrows && books[i].borrows[0].returned) {
      returned.push(books[i])
    } else {
      borrowed.push(books[i])
    }
  }
  return [borrowed,returned]
}

function getBorrowersForBook(book, accounts) {
  const borrowed = book.borrows;
  const booksByAccount = [];
  for(let i = 0; i< borrowed.length; i+=1) {
    const returned = borrowed[i].returned;
    for(let j = 0; j< accounts.length; j+=1) {
      if(accounts[j].id === borrowed[i].id) {
        
        const newAccount = {...accounts[j],returned}
        booksByAccount.push(newAccount);
      }
    }
  }
return booksByAccount.slice(0,10);

}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

function findAccountById(accounts, id) {
  const accountFound = accounts.find((account) => account.id === id);
  return accountFound;
}

function sortAccountsByLastName(accounts) {
  const lastNameSort = accounts.sort((a,b) => {
    const nameA = a.name.last.toUpperCase();
    const nameB = b.name.last.toUpperCase();
    if (nameA < nameB) {
      return - 1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
  return lastNameSort;
}

//receive object "account"
//account looks like accounts[0]
//returns number
//books is array
//probably can use reduce
//"account" focuses on account id
//Use a counter
//maybe filter then reduce
//mabye map then filter?
function getTotalNumberOfBorrows(account, books) {
  const userId = account.id;
  const flattenAllBorrows = books.map((book) => book.borrows).flat();
  const isBorrowed = flattenAllBorrows.filter((borrow) => borrow.id === userId);
  //const totalBorrows = books.reduce((borrows, book) => userId === book.id ? borrows +=1 : 0)
  return isBorrowed.length;
}

//returns ARRAY of BOOK OBJECTS
function getBooksPossessedByAccount(account, books, authors) {
  const userId = account.id;
  
  const addAuthorName = [];
  for (let i = 0; i< books.length; i+= 1) {
    for (let j = 0; j < authors.length; j +=1) {
      const author = authors[j];
      if(books[i].authorId === authors[j].id) {
        books[i].author = author;
      }
    }
    addAuthorName.push(books[i]);
  }

  const booksByAccount = addAuthorName.filter((book) => userId === book.borrows[0].id);



  return booksByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

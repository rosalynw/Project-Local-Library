function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//map and filter?
function getBooksBorrowedCount(books) {
  const flattenAllBorrows = books.map((book) => book.borrows).flat();
  const isBorrowed = flattenAllBorrows.filter((borrow) => borrow.returned === false);
  return isBorrowed.length;
}

function getMostCommonGenres(books) {
  //Collecting all genres into one array
  let genres = [];
  const bookGenre = books.forEach((book) => genres.push(book.genre));

  //Counting Occurences of genre in genres[] and returning {genre: number}
  const genresCount = genres.reduce((allGenres, genre) => {
    //nullish coalescing
    const currCount = allGenres[genre] ?? 0;
    return {...allGenres,[genre]: currCount + 1,}
    }, {});
 
  //Pushing Objects into array with {name: genre, count: number} format
  const allGenres = [];
  for (let genre in genresCount) {
    const name = genre;
    const count = genresCount[genre];
    const genreList = {name, count};
    allGenres.push(genreList);
  }
  //Sorting genres by count then limiting sortedGenreList[] to 5 length
  const sortedGenreList = allGenres.sort((a, b) => b.count - a.count).slice(0, 5);
  return sortedGenreList;
}

//Popularity determined by borrows.length
//`name` key = books[i].title
//`count` key = borrows.length
//map or reduce, sort, slice
function getMostPopularBooks(books) {
  const bookList = books.sort((a, b) => b.borrows.length - a.borrows.length).slice(0, 5);
  const mostPopularBooks = bookList.map((book) => {
    const name = book.title;
    const count = book.borrows.length;
    return mostPopular = {name,count};
  })
  return mostPopularBooks;
}

//map first and last name to template literal string
//Find author by id
function getMostPopularAuthors(books, authors) {

  //Adding authors[] first and last name to books[] authorId
  const addAuthorName = [];
  for (let i = 0; i< books.length; i+= 1) {
    for (let j = 0; j < authors.length; j +=1) {
      if(books[i].authorId === authors[j].id) {
        books[i].authorId = authors[j];
      }
    }
    addAuthorName.push(books[i]);
  }


  //Concat books.borrows[] if author is the same
  const booksByAuthor = addAuthorName.reduce((acc, cur) => {

    // Get the index of the key-value pair.
    const occurs = acc.reduce((acc, book, initialValue) => {
      return (book.authorId === cur.authorId) ? initialValue : acc;
    }, -1);
  
    // If the book is found,
    if (occurs >= 0) {
  
      // append the current value to its list of values.
      acc[occurs].borrows = acc[occurs].borrows.concat(cur.borrows);
  
      // Otherwise,
    } else {
  
      // add curr book to list.
      const book = {
        id: cur.id,
        title: cur.title,
        genre: cur.genre,
        authorId: cur.authorId,
        borrows: cur.borrows
      };
      acc = acc.concat([book]);
    }
    return acc;
  }, []);
  //Arrange books in descending order by borrow length
  const sortedAuthorList = booksByAuthor.sort((a, b) => b.borrows.length - a.borrows.length).slice(0, 5);
  //Changing format
  const mostPopularBookbyAuthor = sortedAuthorList.map((book) => {
    const name = `${book.authorId.name.first} ${book.authorId.name.last}`;
    const count = book.borrows.length;
    return {name, count};
  })
  return mostPopularBookbyAuthor;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

import React, { useState } from 'react';

const BorrowBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Function to add a borrowed book to the list
  const addBorrowedBook = (book) => {
    setBorrowedBooks([...borrowedBooks, book]);
  };

  return (
    <div>
      <h2>Borrowed Books</h2>
      <ul>
        {borrowedBooks.map((book, index) => (
          <li key={index}>{book.name} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowBook;

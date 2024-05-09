import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import BookDetails from "./BookDetails";
import "font-awesome/css/font-awesome.min.css";
import "../css/Book.css";

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/book/books")
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateBookStatus = (bookId, newStatus) => {
    const updatedBooks = books.map((book) =>
      book._id === bookId ? { ...book, status: newStatus } : book
    );
    setBooks(updatedBooks);

    axios
      .put(`http://localhost:3001/book/updateStatus/${bookId}`, {
        status: newStatus,
      })
      .catch((error) => {
        console.error("Error updating book status:", error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div class="Search">
        <div class="search-container">
          <i class="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="book-list">
        {/* Render Book Cards for Filtered Books */}
        {filteredBooks.map((book) => (
          <BookCard
            key={book._id}
            updateBookStatus={updateBookStatus}
            book={book}
            role={role}
          />
        ))}
        {/* Render Book Details for Filtered Books */}
        {filteredBooks.map((book) => (
          <BookDetails key={book._id} book={book} role={role} />
        ))}
      </div>
    </div>
  );
};

export default Books;

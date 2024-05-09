import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/bookdetails.css";
import axios from "axios";
import { Link } from "react-router-dom";

const BookDetails = ({ role }) => {
  const { id } = useParams(); // Get the book ID from the route parameter
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details based on the ID using an API call
    axios
      .get(`http://localhost:3001/book/book/${id}`)
      .then((response) => {
        setBook(response.data); // Set the book details in state
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [id]); // Re-fetch book details whenever the ID changes

  const handleBorrow = () => {
    if (role === "student" && book && book.status === "Available") {
      // Update book status to "Unavailable"
      updateBookStatus(book._id, "Unavailable");

      // Navigate back to the book list
      history.push("/books");
    }
  };

  return (
    <div className="custom-book-details-container">
  {book ? (
    <div className="custom-details">
      <div className="custom-book-image-container">
        <img src={book.imageUrl} alt={book.name} className="custom-book-image" />
      </div>
      <div className="custom-book-info">
        <div className="Back-button"> 
        <h2>{book.name}</h2>
        <Link to="/books">
        <button><strong>Back</strong> <i class="fa fa-undo" aria-hidden="true"></i></button>
        </Link>
        </div>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
        <p>
          <strong>Published By:</strong> {book.publishBy}
        </p>
        <p>
          <strong>Published On:</strong> {book.publishOn}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Pages:</strong> {book.pages}
        </p>
        <p>
          <strong>Status:</strong> {book.status}
        </p>

        {role === "student" && (
          <div className="custom-book-actions">
          
            <Link to="/books" className="custom-btn-link" onClick={handleBorrow}>
            <button> Borrow</button>
            </Link>
          
          </div>
        )}

        {role === "admin" && (
          <div className="custom-book-actions">
           
              <Link to={`/book/${book._id}`} className="custom-btn-link">
              <button><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              </Link>
            
            
              <Link to={`/delete/${book._id}`} className="custom-btn-link">
              <button style={{backgroundColor: 'red'}}><i class="fa fa-trash" aria-hidden="true"></i></button>
              </Link>
            
          </div>
        )}
      </div>
    </div>
  ) : (
    <p></p>
  )}
</div>
  );
};

export default BookDetails;

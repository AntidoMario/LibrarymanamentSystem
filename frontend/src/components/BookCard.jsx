import React from "react";
import "../css/Book.css";
import { Link } from "react-router-dom";

const BookCard = ({ book}) => {
  const { name, author, imageUrl, status } = book;  

  return (
    <div className="book-card">
      <Link to={`/bookdetail/${book._id}`} style={{ textDecoration: 'none' }} className="Linknav">
        <img src={imageUrl} alt={name} className="book-image" />
        <div className="Card-details">
          <h3>{name}</h3>
          <p>{author}</p>
        </div>
      </Link>
      <button className="Cardbut" disabled>{`Status: ${status}`}</button>
    </div>
  );
};

export default BookCard;

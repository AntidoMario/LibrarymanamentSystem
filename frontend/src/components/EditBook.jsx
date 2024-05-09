import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Editbook.css";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishBy, setPublishBy] = useState("");
  const [publishOn, setPublishOn] = useState("");
  const [isbn, setISBN] = useState("");
  const [pages, setPages] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [modified, setModified] = useState(false); // State to track if any field has been modified
  const [error, setError] = useState(""); // State to hold error message
  const navigate = useNavigate();
  const { id } = useParams();

  // Utility function to format the date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/book/book/${id}`)
      .then((res) => {
        const bookData = res.data;
        setName(bookData.name);
        setAuthor(bookData.author);
        setDescription(bookData.description);
        setPublishBy(bookData.publishBy);
        setPublishOn(formatDate(bookData.publishOn)); // Format publishOn date
        setISBN(bookData.isbn);
        setPages(bookData.pages);
        setImageUrl(bookData.imageUrl);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update state based on input change
    switch (name) {
      case "name":
        setName(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "publishBy":
        setPublishBy(value);
        break;
      case "publishOn":
        setPublishOn(value);
        break;
      case "isbn":
        setISBN(value);
        break;
      case "pages":
        setPages(value);
        break;
      case "imageUrl":
        setImageUrl(value);
        break;
      default:
        break;
    }

    // Set modified to true when any field changes
    setModified(true);

    // Clear error message when typing
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field has been modified
    if (!modified) {
      setError("Please make changes before updating.");
      return;
    }

    axios
      .put(`http://localhost:3001/book/book/${id}`, {
        name,
        author,
        description,
        publishBy,
        publishOn,
        isbn,
        pages,
        imageUrl,
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/books");
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit-book-form-container">
      <div className="Back-button">
        <h2>Edit Book</h2>
        <Link to="/books">
        <button><strong>Back</strong> <i class="fa fa-undo" aria-hidden="true"></i></button>
        </Link>
      </div>
      {error && <p className="error-message">{error}</p>}
      <form className="edit-book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="book">Book Name:</label>
          <input
            type="text"
            id="book"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishBy">Published By:</label>
          <input
            type="text"
            id="publishBy"
            name="publishBy"
            value={publishBy}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishOn">Published On:</label>
          <input
            type="date"
            id="publishOn"
            name="publishOn"
            value={publishOn}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={isbn}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pages">Number of Pages:</label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={pages}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="imageUrl"
            value={imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditBook;

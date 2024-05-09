import React, { useState } from "react";
import axios from "axios";
import "../css/addBook.css";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishBy, setPublishBy] = useState("");
  const [publishOn, setPublishOn] = useState("");
  const [isbn, setISBN] = useState("");
  const [pages, setPages] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear specific error when user starts typing in the corresponding input field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the current field
    }));

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!name) errors.name = "Book name is required.";
    if (!author) errors.author = "Author name is required.";
    if (!description) errors.description = "Description is required.";
    if (!publishBy) errors.publishBy = "Published by is required.";
    if (!publishOn) errors.publishOn = "Publish date is required.";
    if (!isbn) errors.isbn = "ISBN is required.";
    if (!pages) errors.pages = "Number of pages is required.";
    if (!imageUrl) errors.imageUrl = "Image URL is required.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    axios
      .post("http://localhost:3001/book/add", {
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
        if (res.data.added) {
          navigate("/books");
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="addbook-form-container">
      <form className="addbook-form" onSubmit={handleSubmit}>
        <h2>Add Book</h2>
        <div className="book-group">
          <label htmlFor="book">Book Name:</label>
          <input
            type="text"
            id="book"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="book-group">
          <label htmlFor="author">Author Name:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={handleInputChange}
          />
          {errors.author && <span className="error">{errors.author}</span>}
        </div>
        <div className="book-group">
          <label htmlFor="publishBy">Published By:</label>
          <input
            type="text"
            id="publishBy"
            name="publishBy"
            value={publishBy}
            onChange={handleInputChange}
          />
          {errors.publishBy && <span className="error">{errors.publishBy}</span>}
        </div>
        <div className="book-group">
          <label htmlFor="publishOn">Published On:</label>
          <input
            type="date"
            id="publishOn"
            name="publishOn"
            value={publishOn}
            onChange={handleInputChange}
          />
          {errors.publishOn && <span className="error">{errors.publishOn}</span>}
        </div>
        <div className="book-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={isbn}
            onChange={handleInputChange}
          />
          {errors.isbn && <span className="error">{errors.isbn}</span>}
        </div>
        <div className="book-group">
          <label htmlFor="pages">Number of Pages:</label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={pages}
            onChange={handleInputChange}
          />
          {errors.pages && <span className="error">{errors.pages}</span>}
        </div>
        <div className="book-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={handleInputChange}
          />
          {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
        </div>
        <div className="book-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;

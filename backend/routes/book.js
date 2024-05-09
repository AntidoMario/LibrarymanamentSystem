import express from 'express';
import { Book } from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, author, description, publishBy, publishOn, isbn, pages, imageUrl } = req.body;

        // Check for required fields
        const requiredFields = { name, author, description, publishBy, publishOn, isbn, pages, imageUrl };
        const emptyFields = Object.keys(requiredFields).filter((key) => !requiredFields[key]);
        
        if (emptyFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${emptyFields.join(', ')}` });
        }

        // Validate publishOn date format
        if (!isValidDate(publishOn)) {
            return res.status(400).json({ message:  'Invalid publishOn date format. Date should be in YYYY-MM-DD format.' });
        }

        // Validate ISBN format (assuming ISBN is a 10-digit or 13-digit number)
        if (!isValidISBN(isbn)) {
            return res.status(400).json({ message: 'Invalid ISBN format. ISBN should be a 10 or 13-digit number.' });
        }

        const newBook = new Book({
            name,
            author,
            description,
            publishBy,
            publishOn,
            isbn,
            pages,
            imageUrl
        });

        await newBook.save();
        return res.json({ added: true });
    } catch (err) {
        console.error('Error adding book:', err);
        return res.status(500).json({ message: 'Error in adding book' });
    }
});

// Helper function to validate date format (YYYY-MM-DD)
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

// Helper function to validate ISBN format (10 or 13-digit number)
function isValidISBN(isbn) {
    const regex = /^\d{10}$|^\d{13}$/;
    return regex.test(isbn);
}

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        return res.json(books);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching books' });
    }
});

router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.json(book);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching book' });
    }
});

router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.json({ updated: true, book: updatedBook });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating book' });
    }
});

router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.json({ deleted: true, book: deletedBook });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting book' });
    }
});

export { router as bookRouter };

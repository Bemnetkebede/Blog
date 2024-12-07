const express = require('express');
const Joi = require('joi');
const Book = require('../Models/book');
const router = express.Router();

// Validation schema using Joi
const bookValidationSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    publishedYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
});

// GET all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({}, null, { limit: 10 });
        console.log('Books fetched:', books);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new book
router.post('/books', async (req, res) => {
    const { error } = bookValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, author, isbn, publishedYear } = req.body;

    try {
    const newBook = new Book({ title, author, isbn, publishedYear });
    await newBook.save();
    res.status(201).json(newBook);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// PUT update a book by ID
router.put('/books/:id', async (req, res) => {
    const { error } = bookValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// DELETE a book by ID
router.delete('/books/:id', async (req, res) => {
try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// Custom endpoint to get random book recommendation
router.get('/books/recommendations', async (req, res) => {
    try {
    const count = await Book.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const recommendedBook = await Book.findOne().skip(randomIndex);
    res.json(recommendedBook);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// Custom endpoint to mark a book as favorite
router.post('/books/favorite/:id', async (req, res) => {
    try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.isFavorite = true;
    await book.save();
    res.json(book);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

module.exports = router;

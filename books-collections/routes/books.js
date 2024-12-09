const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const Book = require('../Models/book');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/Auth');

// Validation schema using Joi
const bookValidationSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    publishedYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    isFavorite: Joi.boolean().required(),
    
});

//only for admin
router.get('/books/all', authenticate, authorize(['admin']), async (req, res) => {
    try {
      const books = await Book.find(); // Fetch all books
        res.json(books);
        } catch (err) {
        res.status(500).json({ error: 'Failed to fetch books' });
        }
    });

// GET all books


// router.get('/books', authenticate, async (req, res) => {
//     try {
//         const userRole = req.user.role; // Extract user role from the token
//         const userId = req.user.id; // Extract user ID from the token
//         const { isFavorite } = req.query; // Check for the isFavorite query parameter

//         let filterCriteria = {};

//         if (userRole === 'user') {
//             // If the user is a regular user, filter by their ID (either all or favorites)
//             filterCriteria.createdBy = userId; // Only show books created by the user

//             if (isFavorite === 'true') {
//                 // Ensure the user ID is in the favorites array
//                 filterCriteria.favorites ={ $in: [new mongoose.Types.ObjectId(userId)] }; // Use ObjectId for comparison
//             }
//         } else if (userRole === 'admin') {
//             // If the user is an admin, show all books, with optional favorites filtering
//             if (isFavorite === 'true') {
//                 filterCriteria.isFavorite = true; // Admin can filter by isFavorite
//             }

//         } else {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }


//         // Debug log to check the filter criteria
//         console.log('Filter criteria:', filterCriteria);

//         // Fetch books based on the filter criteria
//         const books = await Book.find(filterCriteria).populate('favorites');; 

//         // Debug log to check books found
//         console.log('Books found:', books);

//         // If no books are found, explicitly return an empty array
//         if (books.length === 0) {
//             return res.status(200).json({}); // Return an empty array
//         }

//         res.json(books); // Return the filtered books
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch books' });
//     }
// });
router.get('/books', authenticate, async (req, res) => {
    try {
        const userRole = req.user.role;
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const { isFavorite } = req.query;

        let filterCriteria = {};

        // If the user is a user and we want to get books marked as their favorite
        if (userRole === 'user' && isFavorite === 'true') {
            filterCriteria.favorites = { $in: [userId] }; // Check if the user's ID is in the favorites array
        }

        console.log('Filter criteria:', filterCriteria);

        // Find books based on the filter criteria and populate the favorites field
        const books = await Book.find(filterCriteria).populate('favorites');
        console.log('Books found:', books);
        res.json(books || []);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});











// POST a new book
router.post('/books', async (req, res) => {
    const { error } = bookValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, author, isbn, publishedYear ,isFavorite  } = req.body;

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
router.delete('/books/:id',authenticate,  authorize(['admin']), async (req, res) => {
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
router.post('/books/favorite/:id', authenticate, async (req, res) => {
    try {
        const userId = req.user.id; // Retrieve user ID from token
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Add user-specific favorite logic
        if (!book.favorites) {
            book.favorites = []; // Ensure the favorites field exists
        }

        // Check if user already marked it as favorite
        if (book.favorites.includes(userId)) {
            return res.status(400).json({ message: 'Book already marked as favorite by this user' });
        }

        book.favorites.push(userId); 
        await book.save();

        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

Books Collection RESTful API 📚
This is a RESTful API for managing a Books Collection, built using Node.js and MongoDB. The API allows users to perform CRUD operations on books with proper data validation. It also includes custom endpoints to add a personal touch.

Features 🚀
CRUD Operations: Create, Read, Update, and Delete books in the collection.
Data Validation: Ensures all book data is valid before saving to the database.
Database Integration: Persistent data storage with MongoDB.
Custom Endpoints: Special routes for book recommendations and marking favorites.
Deployed API: Publicly accessible on Render.
Endpoints 🔗

CRUD Endpoints
Fetch All Books

GET /books
Returns a list of all books in the collection.
Add a New Book

POST /books
Request Body:
json
Copy code
{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "9780451524935",
  "publishedYear": 1949
}
Update a Book by ID

PUT /books/:id
Request Body:
json
Copy code
{
  "title": "Updated Title",
  "author": "Updated Author",
  "isbn": "9781234567890",
  "publishedYear": 2023
}
Delete a Book by ID

DELETE /books/:id
Custom Endpoints
Get Book Recommendations

GET /books/recommendations
Returns a randomly selected book from the collection.
Mark a Book as Favorite

POST /books/favorite/:id
Marks the book with the specified ID as a favorite.
Getting Started 🛠️
Prerequisites
Node.js (v14+)
MongoDB (local or cloud, e.g., MongoDB Atlas)
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/Bemnet_Kebede/books-collections.git
cd books-collections
Install dependencies:
bash
Copy code
npm install
Create a .env file in the root directory:
env
Copy code
PORT=10000
MONGO_URL=mongodb://localhost:27017/booksCollection
Start the server:
bash
Copy code
npm start
Access the API at http://localhost:10000/api.
Deployment 🌐
Deploy the app on platforms like Render.
Update the .env file to use the production database URI.
Share the deployed API URL.
Sample Data 📖
Use the following JSON data for testing:

json
Copy code
[
  {
    "title": "1984",
    "author": "George Orwell",
    "isbn": "9780451524935",
    "publishedYear": 1949
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "isbn": "9780141439518",
    "publishedYear": 1813
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "publishedYear": 1925
  }
]
Technologies Used 🧰
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Hosting: Render
Testing 🧪
Use tools like Postman or cURL to test API endpoints.

Example cURL Command:
bash
Copy code
curl -X GET http://localhost:10000/api/books
Contributing 🤝
Fork the repository.
Create a feature branch:
bash
Copy code
git checkout -b feature/your-feature
Commit your changes:
bash
Copy code
git commit -m "Add your message"
Push to the branch:
bash
Copy code
git push origin feature/your-feature
Open a pull request.


Contact 📧
For questions or suggestions, feel free to contact .
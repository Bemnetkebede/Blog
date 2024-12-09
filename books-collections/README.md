Advanced Books Collection RESTful API 📚 with Authentication and Role-Based Access Control (RBAC)
This is an advanced version of the Books Collection API built with Node.js, MongoDB, JWT-based authentication, and role-based access control (RBAC). This API allows users to perform CRUD operations on books while enforcing role-based restrictions for admins and users.

Features 🚀
JWT Authentication: Secure user login and registration with JWT tokens.
Role-Based Access Control (RBAC): Differentiate access between admins and users.
CRUD Operations: Create, Read, Update, and Delete books.
Custom Endpoints: Book recommendations and favorites functionality.
Database Integration: MongoDB to store books and user data.
Password Security: Passwords are hashed using bcrypt.
Endpoints 🔗
Authentication Endpoints
POST /auth/signup

Description: Register a new user.
Request Body:
json
Copy code
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
Response:
201 Created
400 Bad Request (if input is invalid)
POST /auth/login

Description: Login a user and return a JWT token.
Request Body:
json
Copy code
{
  "email": "user1@example.com",
  "password": "password123"
}
Response:
200 OK with JWT token
401 Unauthorized (if login fails)
Book CRUD Endpoints
GET /books

Description: Fetch all books, filtered by the user's role and preferences (favorites).
Role: User
Response: List of books based on user-specific criteria.
GET /books/all

Description: Fetch all books (only accessible by admin).
Role: Admin
Response: List of all books.
POST /books

Description: Add a new book to the collection.
Role: User
Request Body:
json
Copy code
{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "9780451524935",
  "publishedYear": 1949
}
Response:
201 Created
400 Bad Request (if input is invalid)
PUT /books/:id

Description: Update an existing book by ID (only accessible by admin).
Role: Admin
Request Body:
json
Copy code
{
  "title": "Updated Title",
  "author": "Updated Author",
  "isbn": "9781234567890",
  "publishedYear": 2023
}
Response:
200 OK with updated book
404 Not Found (if book not found)
DELETE /books/:id

Description: Delete a book by ID (only accessible by admin).
Role: Admin
Response:
200 OK with success message
404 Not Found (if book not found)
Custom Endpoints
GET /books/recommendations

Description: Get book recommendations based on the logged-in user's preferences or role.
Role: User/Admin
Response: Randomly selected book from the collection.
POST /books/favorite/:id

Description: Mark a book as a favorite.
Role: User
Response:
200 OK with success message
404 Not Found (if book not found)
Getting Started 🛠️
Prerequisites
Node.js (v14+)
MongoDB (local or cloud, e.g., MongoDB Atlas)
JWT for authentication
bcrypt for password hashing
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
Create a .env file in the root directory with the following content:

env
Copy code
PORT=10000
MONGO_URL=mongodb://localhost:27017/booksCollection
JWT_SECRET=your-secret-key
Start the server:

bash
Copy code
npm start
Access the API at http://localhost:10000/api.

Deployment 🌐
Deploy the app on a platform like Render or Heroku.
Update the .env file to use the production database URI and JWT secret.
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
Authentication: JWT, bcrypt
Hosting: Render
Testing 🧪
Use tools like Postman or cURL to test API endpoints.

Example cURL Command:
bash
Copy code
curl -X GET http://localhost:10000/api/books
Code and Documentation 🤝
GitHub Repository: Fork the repository and create a feature branch.
Commit your changes:
bash
Copy code
git commit -m "Implement authentication and RBAC"
Push your branch and open a pull request.

Contact 📧
For questions or suggestions, feel free to contact bemnet026@gmail.com.
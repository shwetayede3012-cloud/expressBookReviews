const express = require('express');

const axios = require('axios');
let books = require("./booksdb.js");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Axios functions for Task 11

async function getAllBooks() {
  const response = await axios.get('http://localhost:5000/');
  return response.data;
}

async function getBookByISBN(isbn) {
  const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
  return response.data;
}

async function getBooksByAuthor(author) {
  const response = await axios.get(
    `http://localhost:5000/author/${encodeURIComponent(author)}`
  );
  return response.data;
}

async function getBooksByTitle(title) {
  const response = await axios.get(
    `http://localhost:5000/title/${encodeURIComponent(title)}`
  );
  return response.data;
}


// Register a new user
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books"
    });
  }
});

  if (isValid(username)) {
    return res.status(409).json({
      message: "User already exists"
    });
  }

  users.push({
    username: username,
    password: password
  });

  return res.status(201).json({
    message: "User successfully registered"
  });
});


// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.json(books);
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.json(book);
  }

  return res.status(404).json({
    message: "Book not found"
  });
});


// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const result = {};

  for (const isbn in books) {
    if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
      result[isbn] = books[isbn];
    }
  }

  return res.json(result);
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const result = {};

  for (const isbn in books) {
    if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
      result[isbn] = books[isbn];
    }
  }

  return res.json(result);
});


// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.json(books[isbn].reviews);
  }

  return res.status(404).json({
    message: "Book not found"
  });
});


module.exports.general = public_users;

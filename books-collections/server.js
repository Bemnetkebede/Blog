const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
require('dotenv').config();
const booksRouter = require('./routes/books');



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(()=>console.log('Mongoose Connected'))
.catch((err)=>console.log(err))


app.use('/api', booksRouter);


app.listen(PORT , ()=>console.log(`Server running on port ${PORT}`))
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(()=>console.log('Mongoose Connected'))
.catch((err)=>console.log(err))

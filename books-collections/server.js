const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
require('dotenv').config();
const booksRouter = require('./routes/books');
const authRoutes = require('./routes/Auth')



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

mongoose.set('debug', true); 

mongoose.connect(MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true ,  
    serverSelectionTimeoutMS: 50000, 
    socketTimeoutMS: 65000}  )
.then(()=>console.log('Mongoose Connected'))
.catch((err)=>console.log(err))


mongoose.connection.on('connected', () => {
    console.log('Mongoose successfully connected to MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.warn('Mongoose disconnected');
    });
    

app.use('/api', booksRouter);
app.use('/api/Auth', authRoutes);
app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        console.log("can't connect to db")
        return res.status(503).json({ message: 'Database not connected' });
        }
        next();
    });
    




app.listen(PORT , ()=>console.log(`Server running on port ${PORT}`))
    
    
console.log(MONGO_URL)



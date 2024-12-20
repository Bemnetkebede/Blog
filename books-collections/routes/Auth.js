const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User')

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        
        const userExists = await User.findOne({ email });
        console.log("User Exists:", userExists);
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
        }
        console.log("Role from DB:", user.role); 
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        });
        res.json({ token , role: user.role  });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;

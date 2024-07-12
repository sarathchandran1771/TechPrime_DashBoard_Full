const User = require('../models/UserSchema')
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // Create a new user instance
        const newUser = new User({ email, password, username });

        // Save the user to the database
        await newUser.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
};

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        req.user = user; // Pass the user to the next middleware
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const loginResponse = (req, res) => {
    res.json({ message: 'Logged in successfully', token: req.token, user: req.user });
};


const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    userLogin,
    registerUser,
    loginResponse,
    logout
} 
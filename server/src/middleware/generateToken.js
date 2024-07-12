const jwt = require('jsonwebtoken');

const generateToken = (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            return res.status(400).json({ message: 'User data is required to generate token' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        req.token = token;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate token', error });
    }
};

module.exports = generateToken;

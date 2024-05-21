const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const signupAction = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // const user = new User({ username, email, password });
        
        const data= await User.create({ username, email, password });
        res.json({ data, message: 'User created successfully' });
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const loginAction = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username }});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const logoutAction = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

module.exports = { signupAction, loginAction, logoutAction };
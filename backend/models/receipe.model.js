const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    ingredients: String,
    instructions: String,
    sustainabilityRating: Number
});

const User = mongoose.model('user', userSchema);

module.exports = User;
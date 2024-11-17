const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: String,
    email: String,
    photo: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('register', registerSchema);
module.exports = User;

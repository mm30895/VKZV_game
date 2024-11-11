const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  balance: { type: Number, default: 100 },
});

const User = mongoose.model('User', userSchema);  // Make sure to define the model here

module.exports = User;  // Export the User model
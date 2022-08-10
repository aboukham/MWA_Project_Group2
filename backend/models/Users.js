const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
name: String,
contactNumber: String,
email: { type: String,  unique: true },
password: { type: String, required: true },
status : String,
role: String
});

module.exports = mongoose.model('User', userSchema);

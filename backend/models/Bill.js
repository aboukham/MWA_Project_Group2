const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const billSchema = new mongoose.Schema({
name: { type : String, required: true },
uuid: { type : String, required: true },
email: { type : String, required: true },
contactNumber : String,
paymentMethod : String,
total: Number,
productDetails: {
        nameProduct : String,
        price : Number,
        total : Number,
        category : String,
        quantity : String
    },
createdBy : String
});

module.exports = mongoose.model('Bill', billSchema);

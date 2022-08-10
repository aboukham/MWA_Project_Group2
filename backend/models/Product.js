const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const Category = require('./Category')
const productSchema = new mongoose.Schema({
name: String,
category:{
    type: Schema.Types.ObjectId,
    ref: "Category"
},
description : String,
price: Number,
status : String,
isHalal: Boolean

});

module.exports = mongoose.model('Product', productSchema);

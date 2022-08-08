const Category = require('../models/Category')
const Product = require('../models/Product')
const Bill = require('../models/Bill')
module.exports.details = async (req, res) => {
  var categoryCount;
  var productCount;
  var billCount;
  categoryCount= await Category.find().count();
  productCount = await Product.find().count();
  billCount = await Bill.find().count();
  var data ={
    category : categoryCount,
    product : productCount,
    bill: billCount
  }
  return res.status(200).json(data);
}

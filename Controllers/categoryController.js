const Category = require('../models/Category')
require('dotenv').config()

module.exports.addCategory = (req, res, next) => {
  let category = req.body
  Category.create({
    name: category.name,
  })
  res.send({ message: 'Category added successfully' })
}

module.exports.updateCategory = (req, res, next) => {
  let category = req.body
  Category.updateOne(
    { _id: req.params.id },
    { $set: { name: category.name } },
  ).exec()
  res.send({ message: 'category updated' })
}

module.exports.getCategory = async (req, res, next) => {
  const categories = await Category.find({}, { name: 1, _id: 0 }).sort({
    name: 1,
  })
  res.send({ categories })
}

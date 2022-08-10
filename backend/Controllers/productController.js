const Product = require('../models/Product')

require('dotenv').config()

module.exports.addProduct = (req, res, next) => {
  let product = req.body
  Product.create({
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price,
    status: 'true',
    isHalal: product.isHalal
  })
  res.send({ message: 'Product added successfully' })
}

module.exports.updateProduct = async (req, res, next) => {
  const product = req.body
  await Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        isHalal: product.isHalal
      },
    },
  ).exec()
  res.send({ message: 'product updated Successfully' })
}

module.exports.getProduct = async (req, res, next) => {
  const products = await Product.find().populate('category', 'name').exec()
  res.send({ products })
}

module.exports.getByCategoryId = async (req, res, next) => {
  const id = req.params.id
  const products = await Product.find(
    { status: 'true', category: id },
    { name: 1 },
  )
    .populate('category', 'name')
    .exec()
  res.send({ products })
}

module.exports.getByProductId = async (req, res) => {
  const id = req.params.id
  const products = await Product.find({ _id: id })
    .populate('category', 'name')
    .exec()
  res.send({ products })
}
module.exports.deleteProductById = async (err, req, res, next) => {
  await Product.deleteOne({ _id: req.params.id })
  res.send({ message: 'Product deleted successfully' })
}
module.exports.updateProductStatus = async (req, res) => {
  await Product.updateOne(
    { _id: req.params.id },
    { $set: { status: req.body.status } },
  )

  res.send({ message: 'Status updated successfully' })
}

const express = require('express')
const nodemailer = require('nodemailer')
var auth = require('../Service/Authentication')
var checkRole = require('../Service/checkRole')
const {
  updateProduct,
  deleteProductById,
  getByProductId,
  getByCategoryId,
  getProduct,
  addProduct,
  updateProductStatus,
} = require('../Controllers/productController')
const router = express.Router()
router.post(
  '/newProduct',
  auth.authenticationToken,
  checkRole.checkRole,
  addProduct,
)
router.get('/', auth.authenticationToken, getProduct)
router.get('/ByCategory/:id', auth.authenticationToken, getByCategoryId)
router.get('/ByProduct/:id', auth.authenticationToken, getByProductId)
router.patch(
  '/:id',
  auth.authenticationToken,
  checkRole.checkRole,
  updateProduct,
)
router.delete(
  '/:id',
  auth.authenticationToken,
  checkRole.checkRole,
  deleteProductById,
)
router.patch(
  '/status/:id',
  auth.authenticationToken,
  checkRole.checkRole,
  updateProductStatus,
)

module.exports = router

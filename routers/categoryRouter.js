const express = require('express')
const nodemailer = require('nodemailer')
var auth = require('../Service/Authentication')
var checkRole = require('../Service/checkRole')
const {
  getCategory,
  addCategory,
  updateCategory,
} = require('../Controllers/categoryController')
const router = express.Router()
router.post(
  '/newCategory',
  auth.authenticationToken,
  checkRole.checkRole,
  addCategory,
)
router.get('/', auth.authenticationToken, getCategory)
router.patch(
  '/:id',
  auth.authenticationToken,
  checkRole.checkRole,
  updateCategory,
)

module.exports = router

const express = require('express')
var auth = require('../Service/Authentication')
const {
  generateReport,
  getPdf,
  getBills,
  deleteBill,
} = require('../Controllers/billController')
const router = express.Router()
router.post('/report', auth.authenticationToken, generateReport)
router.post('/pdf', auth.authenticationToken, getPdf)
router.get('/', auth.authenticationToken, getBills)
router.delete('/:id', auth.authenticationToken, deleteBill)
module.exports = router

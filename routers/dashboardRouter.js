const express = require('express')
var auth = require('../Service/Authentication')
const {
    details
} = require('../Controllers/dashboardController')
const router = express.Router()

router.get('/', auth.authenticationToken, details)

module.exports = router

const express = require('express')
var auth = require('../Service/Authentication')
var checkRole = require('../Service/checkRole')
const {
  changePassword,
  checkToken,
  forgot,
  checkUser,
  getUsersRole,
  addUser,
  updateUserStatus,
} = require('../Controllers/userController')
const router = express.Router()
router.get('/', auth.authenticationToken, checkRole.checkRole, getUsersRole) //check role because normal user cannot use this api
router.get('/checkToken', auth.authenticationToken, checkToken)
router.post('/singup', addUser)
router.post('/login', checkUser)
router.post('/forgotPass', forgot)
router.post('/changePassword', auth.authenticationToken, changePassword)
router.patch(
  '/:id',
  auth.authenticationToken,
  checkRole.checkRole,
  updateUserStatus,
)

module.exports = router

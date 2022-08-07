const express = require('express')
const nodemailer = require ('nodemailer')
var auth = require('../Service/Authentication')
var checkRole = require('../Service/checkRole')
const {checkToken,forgot, checkUser, getUsers, getUserById, addUser, updateUserById, deleteUserById } = require('../Controllers/userController')
const router = express.Router()
router.get('/',auth.authenticationToken,checkRole.checkRole, getUsers) //check role because normal user cannot use this api
router.get('/checkToken',auth.authenticationToken, checkToken)
router.post('/singup', addUser)
router.post('/login', checkUser)
router.post('/forgotPass', forgot)
router.patch('/:id',auth.authenticationToken,checkRole.checkRole, updateUserById)
router.delete('/:id',deleteUserById)





module.exports = router
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
var auth = require('../Service/Authentication')
var checkRole = require('../Service/checkRole')
require('dotenv').config()
module.exports.getUsersRole = async (req, res, next) => {
  const users = await User.find({ role: 'user' })
  res.send({ users })
}
module.exports.addUser = (req, res, next) => {
  let user = req.body
  User.find({ email: user.email }, function (err, users) {
    if (!users.length) {
      User.create({
        name: user.name,
        contactNumber: user.contactNumber,
        email: user.email,
        password: user.password,
        status: 'false',
        role: 'user',
      })
      res.send({ added: user })
    } else {
      return res.status(200).json({ message: 'Email already exist' })
    }
  })
}

module.exports.checkUser = (req, res, next) => {
  let user = req.body
  User.find({ email: user.email }, function (err, users) {
    if (!users.length || users[0].password != user.password) {
      return res.status(401).json({ message: 'user does not exist' })
    } else if (users[0].status === 'false') {
      return res.status(401).json({ message: 'Wait for adminb Approval' })
    } else if (users[0].password == user.password) {
      const response = { email: users[0].email, role: users[0].role }
      const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
        expiresIn: '8h',
      })
      res.status(200).json({ token: accessToken })
    } else {
      return res
        .status(400)
        .json({ message: 'Something went wrong! Please try again later' })
    }
  })
}

module.exports.forgot = (req, res, next) => {
  let user = req.body
  User.find({ email: user.email }, function (err, users) {
    if (users.length <= 0) {
      return res
        .status(200)
        .json({ message: 'Password sent successfully to your email' })
    } else {
      const nodemailer = require('nodemailer')
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: 'lpdepwrvvztqubam',
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
      const mailOptions = {
        from: process.env.EMAIL,
        to: users[0].email,
        subject: 'password by Halal Restaurant',
        html:
          '<p><b> Your login details for Halal Restaurant </b><br><b>Email: </b> ' +
          users[0].email +
          '<br> <b>password: </b>' +
          users[0].password +
          '<br><a href= "http://localhost:4200">Click here to login</a>' +
          '</p>',
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })

      return res
        .status(200)
        .json({ message: 'Password send successfully to your email' })
    }
  })
}



module.exports.updateUserStatus = async (req, res, next) => {
  await User.updateOne(
    { _id: req.params.id },
    { $set: { status: req.body.status } },
  )

  res.send({ update: req.body })
}

module.exports.checkToken = (req, res) => {
  return res.status(200).json({ message: 'true' })
}

module.exports.changePassword = (req, res) => {
  const user = req.body;
  const emails = res.locals.email;
  User.find({ email: emails, password: user.oldPassword }, function (err,users) {
    if (!users.length) {
      return res.status(400).json({ message: 'Incorrect Old Password' })
    } else if (users[0].password == user.oldPassword) {
      User.updateMany({ }, { $set: { password: user.newPassword } }, {arrayFilter:[{email: emails }]}).exec()
      return res.status(200).json({ message: 'Password updated' })
    } else {
      return res
        .status(400)
        .json({ message: 'Something went wrong! Please try again later' })
    }
  })
}

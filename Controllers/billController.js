const Bill = require('../models/Bill')
require('dotenv').config()
let ejs = require('ejs')
let pdf = require('html-pdf')
let path = require('path')
let fs = require('fs')
let uuid = require('uuid')

module.exports.generateReport = (req, res, next) => {
  const generateUuid = uuid.v1()
  const orderDetails = req.body
  const productDetailsReport = JSON.parse(orderDetails.productDetails)
  Bill.create({
    name: orderDetails.name,
    uuid: generateUuid,
    email: orderDetails.email,
    contactNumber: orderDetails.contactNumber,
    paymentMethod: orderDetails.paymentMethod,
    totalAmount: orderDetails.totalAmount,
    productDetails: orderDetails.productDetails,
    createdBy: res.locals.email,
  })
  ejs.renderFile(
    path.join(__dirname, '', 'report.ejs'),
    {
      productDetails: productDetailsReport,
      name: orderDetails.name,
      email: orderDetails.email,
      contactNumber: orderDetails.contactNumber,
      paymentMethod: orderDetails.paymentMethod,
      totalAmount: orderDetails.totalAmount,
    },
    (err, results) => {
      if (err) {
        return res.status(500).json(err)
      } else {
        pdf
          .create(results)
          .toFile('./generated_pdf/' + generateUuid + '.pdf', (err, data) => {
            if (err) {
              return res.status(500).json(err)
            } else {
              return res.status(200).json({ uuid: generateUuid })
            }
          })
      }
    },
  )
}

module.exports.getPdf = (req, res, next) => {
  const orderDetails = req.body
  const pdfPath = './generated_pdf/' + orderDetails.uuid + '.pdf'
  if (fs.existsSync(pdfPath)) {
    res.contentType('application/pdf')
    fs.createReadStream(pdfPath).pipe(res)
  } else {
    var productDetailsReport = JSON.parse(orderDetails.productDetails)
    ejs.renderFile(
      path.join(__dirname, '', 'report.ejs'),
      {
        productDetails: productDetailsReport,
        name: orderDetails.name,
        email: orderDetails.email,
        contactNumber: orderDetails.contactNumber,
        paymentMethod: orderDetails.paymentMethod,
        totalAmount: orderDetails.totalAmount,
      },
      (err, results) => {
        if (err) {
          return res.status(500).json(err)
        } else {
          pdf
            .create(results)
            .toFile(
              './generated_pdf/' + orderDetails.uuid + '.pdf',
              (err, data) => {
                if (err) {
                  return res.status(500).json(err)
                } else {
                  res.contentType('application/pdf')
                  fs.createReadStream(pdfPath).pipe(res)
                }
              },
            )
        }
      },
    )
  }
}

module.exports.getBills = async (req, res) => {
  const bills = await Bill.find().exec()
  res.send({ bills })
}

module.exports.deleteBill = async (req, res) => {
  const bill= req.params.id
  await Bill.deleteOne({ _id: bill })
  res.send({ message: 'Bill deleted successfully' })
}

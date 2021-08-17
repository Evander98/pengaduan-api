const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
      user : 'christrevand@gmail.com',
      pass : 'bzrrkzrbhmzbovtp'
  },
  tls : {
      rejectUnauthorized : false
  }
})


module.exports = transporter
const auth = require('./authController')
const complaint = require('./complaintController')
const partner = require('./partnerController')
const user = require('./userControllers')
const algorithm = require('./algorithmController')

module.exports = {
  auth,
  complaint,
  partner,
  user,
  algorithm
}
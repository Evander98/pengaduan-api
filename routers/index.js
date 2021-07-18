const auth = require('./authRouter')
const complaint = require('./complaintRouter')
const partner = require('./partnerRouter')
const user = require('./userRouter')
const algorithm = require('./algorithmRouter')

module.exports = {
  auth,
  complaint,
  partner,
  user,
  algorithm
}
const auth = require('./authRouter')
const complaint = require('./complaintRouter')
const partner = require('./partnerRouter')

module.exports = {
  auth,
  complaint,
  partner
}
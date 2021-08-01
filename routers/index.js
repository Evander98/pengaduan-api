const auth = require('./authRouter')
const complaint = require('./complaintRouter')
const partner = require('./partnerRouter')
const user = require('./userRouter')
const algorithm = require('./algorithmRouter')
const legislation = require('./legislationRouter')
const manuscript = require('./manuscriptRouter')
const news = require('./newsRouter')
const schedule = require('./scheduleRouter')
const meetingResult = require('./meetingResultRouter')

module.exports = {
  auth,
  complaint,
  partner,
  user,
  algorithm,
  legislation,
  manuscript,
  news,
  schedule,
  meetingResult,
}
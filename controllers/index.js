const auth = require('./authController')
const complaint = require('./complaintController')
const partner = require('./partnerController')
const user = require('./userControllers')
const algorithm = require('./algorithmController')
const legislation = require('./legislationController')
const manuscript = require('./manuscriptController')
const news = require('./newsController')
const schedule = require('./scheduleController')
const meetingResult = require('./meetingResultController')

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
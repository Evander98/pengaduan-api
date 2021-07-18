const router = require('express').Router()
const { addComplaint, getComplaintList, comment, getComment, countComments, updateStatus } = require('../controllers').complaint

router.post('/addComplaint', addComplaint)
router.get('/complaintList', getComplaintList)
router.get('/getComment', getComment)
router.post('/comment', comment)
router.get('/countComments', countComments)
router.put('/updateStatus', updateStatus)

module.exports = router
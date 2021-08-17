const router = require('express').Router()
const { addComplaint, getComplaintList, comment, getComment, countComments, updateStatus, countComplaintByPartner, deleteComplaint } = require('../controllers').complaint

router.post('/addComplaint', addComplaint)
router.get('/complaintList', getComplaintList)
router.get('/countComplaintByPartner', countComplaintByPartner)
router.get('/getComment', getComment)
router.post('/comment', comment)
router.get('/countComments', countComments)
router.put('/updateStatus', updateStatus)
router.delete('/deleteComplaint', deleteComplaint)

module.exports = router
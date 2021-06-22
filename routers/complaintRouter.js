const router = require('express').Router()
const { addComplaint, getComplaintList } = require('../controllers').complaint

router.post('/addComplaint', addComplaint)
router.get('/complaintList', getComplaintList)

module.exports = router
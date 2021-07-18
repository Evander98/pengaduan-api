const router = require('express').Router()
const { searchComplaint } = require('../controllers').algorithm

router.get('/searchComplaint', searchComplaint)

module.exports = router
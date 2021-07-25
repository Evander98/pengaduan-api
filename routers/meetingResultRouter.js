const router = require('express').Router()
const { addResult, getResult } = require('../controllers').meetingResult

router.post('/add', addResult)
router.get('/get', getResult)

module.exports = router
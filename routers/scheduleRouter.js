const router = require('express').Router()
const { getSchedule, addSchedule } = require('../controllers').schedule

router.get('/get', getSchedule)
router.post('/add', addSchedule)

module.exports = router
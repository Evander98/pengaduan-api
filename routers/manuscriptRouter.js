const router = require('express').Router()
const { getManuscript, addManuscript } = require('../controllers').manuscript

router.get('/get', getManuscript)
router.post('/add', addManuscript)

module.exports = router
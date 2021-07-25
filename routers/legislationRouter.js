const router = require('express').Router()
const { getLegislation, addLegislation } = require('../controllers').legislation

router.get('/get', getLegislation)
router.post('/add', addLegislation)

module.exports = router
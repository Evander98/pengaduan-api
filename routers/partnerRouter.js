const router = require('express').Router()
const { getPartners } = require('../controllers').partner

router.get('/getPartners', getPartners)

module.exports = router
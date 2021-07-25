const router = require('express').Router()
const { getPartners, getCommission, getAll } = require('../controllers').partner

router.get('/getPartners', getPartners)
router.get('/getCommissions', getCommission)
router.get('/getAll', getAll)

module.exports = router
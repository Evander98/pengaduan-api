const router = require('express').Router()
const { getUser, editProfile } = require('../controllers').user

router.get('/getUser', getUser)
router.put('/editProfile', editProfile)

module.exports = router

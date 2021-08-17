const router = require('express').Router()
const { getUser, editProfile, getUsers, getAddress, getSubdistrict, getWard } = require('../controllers').user

router.get('/getUser', getUser)
router.get('/getUsers', getUsers)
router.put('/editProfile', editProfile)
router.get('/getAddress', getAddress)
router.get('/getSubDistrict', getSubdistrict)
router.get('/getWard', getWard)

module.exports = router
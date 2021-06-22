const router = require('express').Router()
const { onRegister, onLogin } = require('../controllers').auth

router.post('/onRegister', onRegister)
router.get('/onLogin', onLogin)

module.exports = router
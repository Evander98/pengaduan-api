const router = require('express').Router()
const { onRegister, onLogin, verification } = require('../controllers').auth

router.post('/onRegister', onRegister)
router.get('/onLogin', onLogin)
router.get('/verify', verification)

module.exports = router
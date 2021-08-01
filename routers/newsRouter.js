const router = require('express').Router()
const { getNews, addNews } = require('../controllers').news

router.get('/get', getNews)
router.post('/add', addNews)

module.exports = router
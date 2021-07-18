const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 2000

const { auth, complaint, partner, user, algorithm } = require('./routers')

app.use(cors())
app.use(express.json())

app.use('/auth', auth)
app.use('/complaint', complaint)
app.use('/partner', partner)
app.use('/user', user)
app.use('/find', algorithm)

app.use('/', (req, res) => {
  res.send('<h1>Selamat datang di Pengaduan API</h1>')
})


app.listen(port, () => console.log('Server running on port ' + port))
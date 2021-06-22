const db = require("../database");

module.exports = {
  getCommission : (req, res) => {
    db.query("select * from komisi", (err, result) => {

    })
  },
  getPartners : (req, res) => {
    db.query("select * from mitra_kerja", (err, result) => {
      res.send(result)
    })
  }
}
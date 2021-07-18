const db = require("../database");

module.exports = {
  getUser : (req, res) => {
    db.query(`select nama_lengkap, email, kecamatan, kelurahan, kode_pos, nomor_telepon from users where id = ${req.query.id}`, (err, result) => {
      res.send(result[0])
    })
  },
  editProfile : (req, res) => {
    db.query(`update users set ? where id = ${req.query.id}`, req.body, (err, result) => {
      try {
        if (err) throw err
        res.redirect(`/user/getUser?id=${req.query.id}`)
      } catch (err) {
        console.log(err)
      }
    })
  }
}
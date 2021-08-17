const db = require("../database");

module.exports = {
  getUser : (req, res) => {
    db.query(`select id, nama_lengkap, email, kecamatan, kelurahan, kode_pos, nomor_telepon, role, nik, jenis_kelamin from users where id = ${req.query.id}`, (err, result) => {
      res.send(result[0])
    })
  },
  getUsers : (req, res) => {
    db.query(`select id, nama_lengkap, email, kecamatan, kelurahan, kode_pos, nomor_telepon, role, nik, jenis_kelamin from users where role = 0`, (err, result) => {
      res.send(result)
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
  },
  getAddress : (req, res) => {
    db.query(`select id_kelurahan, kelurahan.id_kecamatan, nama_kelurahan, nama_kecamatan from kelurahan join kecamatan on kelurahan.id_kecamatan = kecamatan.id_kecamatan;`, (err, result) => {
      // console.log(result)
      res.send(result)
    })
  },
  getSubdistrict : (req, res) => {
    db.query(`select * from kecamatan`, (err, result) =>{
      res.send(result)
    })
  },
  getWard : (req, res) => {
    if(req.query.nama_kecamatan){
      db.query(`select kelurahan.* from kecamatan join kelurahan on kecamatan.id_kecamatan = kelurahan.id_kecamatan where nama_kecamatan = ${req.query.nama_kecamatan}`, (err, result) => {
        res.send(result)
      })
    }else{
      db.query(`select kelurahan.* from kecamatan join kelurahan on kecamatan.id_kecamatan = kelurahan.id_kecamatan`, (err, result) => {
        res.send(result)
      })
    }
  }
}
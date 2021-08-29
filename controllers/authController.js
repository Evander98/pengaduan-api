const db = require("../database");
const crypto = require("crypto");
const verification = require("../helper/emailer/userVerification")
const transporter = require("../helper/mailConfig")

module.exports = {
  onRegister: (req, res) => {
    const hashedPassword = crypto
      .createHmac("sha256", "kunciPengaduan")
      .update(req.body.sandi)
      .digest("hex");
    const data = {
      nama_lengkap: req.body.namaLengkap,
      email: req.body.email,
      kata_sandi: hashedPassword,
      jenis_kelamin: 0,
      role: 0,
      is_verified : 0
    };
    db.query(
      `select email from users where email='${data.email}'`,
      (err, result) => {
        try {
          if (err) throw { msg: "Server Error" };
          if (result.length > 0)
            throw { msg: "Email tidak tersedia, gunakan email lain!" };
          db.query(`insert into users set ?`, data, (err) => {
            try {
              if (err) throw { msg: "Server Error" };
              db.query(
                `select id, nama_lengkap, email, jenis_kelamin, role, kelurahan, kecamatan, kode_pos, nomor_telepon, nik, is_verified from users where email='${data.email}'`,
                (err, selectResult) => {
                  try {
                    if (err) throw { msg: "Server Error" };
                    var mailOptions = verification(selectResult[0].email);
                    transporter.sendMail(mailOptions, (err) => {
                      if (err) throw "Error saat pengiriman email";
                      res.send({msg : 'Registrasi berhasil, silahkan periksa email untuk verifikasi akun!'});
                    });
                  } catch (err) {
                    res.send(err);
                  }
                }
              );
            } catch (err) {
              res.send(err);
            }
          });
        } catch (err) {
          res.send(err);
        }
      }
    );
  },
  onLogin: (req, res) => {
    let email = req.query.email;
    const hashedPassword = crypto
      .createHmac("sha256", "kunciPengaduan")
      .update(req.query.sandi)
      .digest("hex");
    db.query(
      `select id, nama_lengkap, email, jenis_kelamin, role, kelurahan, kecamatan, kode_pos, nomor_telepon, nik, is_verified from users where email='${email}' and kata_sandi='${hashedPassword}'`,
      (err, selectResult) => {
        try {
          if (err) throw { msg: "Server Error" };
          if (selectResult.length < 1) throw {msg: "Email atau Kata Sandi salah, tolong periksa kembali!",};

          if(selectResult[0].is_verified == 0){
            var mailOptions = verification(selectResult[0].email);
            transporter.sendMail(mailOptions, (err) => {
              if (err) throw "Error saat pengiriman email";
              res.send({msg : 'Akun belum terverifikasi, silahkan periksa email untuk verifikasi akun!'});
            })
          }else{
            res.send(selectResult[0]);
          }
        } catch (err) {
          res.send(err);
        }
      }
    );
  },
  verification: (req, res) => {
    db.query(`update users set is_verified = 1 where email = '${req.query.email}'`, err => {
      res.send('Email berhasil di verifikasi')
    })
  }  
};

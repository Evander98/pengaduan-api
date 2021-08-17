const db = require("../database");
const approval = require("../helper/emailer/complaintApproved");
const deleted = require("../helper/emailer/complaintDeleted")
const transporter = require("../helper/mailConfig");
module.exports = {
  addComplaint: (req, res) => {
    let { id, judul, isi, mitra } = req.body;
    db.query(
      `insert into daftar_pengaduan (id_pengadu, id_mitra, judul_pengaduan, isi_pengaduan, status) values(${id}, ${mitra}, '${judul}', '${isi}', 0)`,
      (err, result) => {
        try {
          if (err) throw "Server Error";
          res.send("Pengaduan terkirim!");
        } catch (err) {
          res.send(err);
        }
      }
    );
  },
  getComplaintList: (req, res) => {
    db.query(
      "select id_pengaduan, id_pengadu, id_mitra, nama_mitra_kerja, users.nama_lengkap, judul_pengaduan, isi_pengaduan, status, DATE_FORMAT(waktu_pengaduan,'%d-%m-%Y') as tanggal_pengaduan, time(waktu_pengaduan) as waktu_pengaduan from daftar_pengaduan inner join users on daftar_pengaduan.id_pengadu=users.id inner join mitra_kerja on daftar_pengaduan.id_mitra=mitra_kerja.id_mitra_kerja order by id_pengaduan desc",
      (err, result) => {
        try {
          if (err) throw { msg: "Server Error" };
          db.query(`select * from kata_larangan`, (err, result2) => {
            var newResult = []
            for (let i in result) {
              newResult.push({...result[i], sara: false})
              for (let j in result2) {
                if (result[i].isi_pengaduan.includes(result2[j].kata_larangan)) {
                  newResult[i].sara = true
                }
              }
            }
            res.send(newResult);
          });
        } catch (err) {
          console.log(err);
        }
      }
    );
  },
  countComplaintByPartner: (req, res) => {
    db.query(
      "select id_mitra, nama_mitra_kerja, count(id_mitra) as count from daftar_pengaduan join mitra_kerja on id_mitra=id_mitra_kerja group by id_mitra",
      (err, result) => {
        res.send(result);
      }
    );
  },
  getComment: (req, res) => {
    db.query(
      `select nama_lengkap, isi_komentar from komentar inner join users on id_user=users.id where id_pengaduan=${req.query.id_pengaduan}`,
      (err, result) => {
        if (err) throw "Server Error";
        // console.log(result)
        res.send(result);
      }
    );
  },
  comment: (req, res) => {
    db.query("insert into komentar set ?", req.body, (err, result) => {
      try {
        if (err) throw "Server Error";
        res.redirect(
          `/complaint/getComment?id_pengaduan=${req.body.id_pengaduan}`
        );
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    });
  },
  countComments: (req, res) => {
    db.query(
      "select count(komentar.id_pengaduan) as jumlahKomentar, komentar.id_pengaduan from komentar join daftar_pengaduan on komentar.id_pengaduan=daftar_pengaduan.id_pengaduan group by komentar.id_pengaduan",
      (err, result) => {
        // console.log(result)
        res.send(result);
      }
    );
  },
  updateStatus: (req, res) => {
    db.query(
      `update daftar_pengaduan set status = ${req.query.status} where id_pengaduan = ${req.query.id}`,
      (err, result) => {
        db.query(
          `select judul_pengaduan, email from daftar_pengaduan join users on id_pengadu = users.id where id_pengaduan = ${req.query.id}`,
          (err, result2) => {
            var mailOptions = approval(
              result2[0].email,
              result2[0].judul_pengaduan,
              req.query.status
            );
            transporter.sendMail(mailOptions, (err, result3) => {
              if (err) throw "Error saat pengiriman email";
              res.send("Update Berhasil");
            });
          }
        );
      }
    );
  },
  deleteComplaint : (req, res) => {
    db.query(`select email, judul_pengaduan from daftar_pengaduan join users on id_pengadu = users.id where id_pengaduan = ${req.query.id_pengaduan}`, (err, result) => {
      db.query(`delete from daftar_pengaduan where id_pengaduan = ${req.query.id_pengaduan}`, err => {
        if(err) throw "Server Error"
        var mail = deleted(result[0].email, result[0].judul_pengaduan)
        transporter.sendMail(mail, (err, result2) => {
          if (err) throw "Error saat pengiriman email";
          res.send('Pengaduan berhasil dihapus')
        })
      })
    })
  }
};

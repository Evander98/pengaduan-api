const db = require("../database");

module.exports = {
  getCommission: (req, res) => {
    db.query("select * from komisi", (err, result) => {
      res.send(result);
    });
  },
  getPartners: (req, res) => {
    db.query("select * from mitra_kerja", (err, result) => {
      res.send(result);
    });
  },
  getAll: (req, res) => {
    db.query("select * from komisi", (err, commissionResult) => {
      db.query("select * from mitra_kerja", (err, partnerResult) => {
        db.query("select id_mitra, count(id_mitra_kerja) as count from daftar_pengaduan join mitra_kerja on daftar_pengaduan.id_mitra = mitra_kerja.id_mitra_kerja group by id_mitra", (err, countResult) => {
          var newResult = [];
  
          for (let i in commissionResult) {
            newResult.push({idKomisi: commissionResult[i].id_komisi, namaKomisi: commissionResult[i].nama_komisi, mitraKerja : []});
            for (let j in partnerResult) {
              if (partnerResult[j].id_komisi == newResult[i].idKomisi) {
                newResult[i].mitraKerja.push({idMitraKerja: partnerResult[j].id_mitra_kerja, namaMitraKerja: partnerResult[j].nama_mitra_kerja});
              }
            }
          }
          // console.log(newResult)
          res.send(newResult);
        })
      });
    });
  },
};

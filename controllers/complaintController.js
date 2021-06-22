const db = require("../database");

module.exports = {
  addComplaint: (req, res) => {
    let { id, judul, isi, mitra } = req.body;
    db.query(
      `insert into daftar_pengaduan (id_pengadu, id_mitra, judul_pengaduan, isi_pengaduan, status) values(${id}, ${mitra}, '${judul}', '${isi}', 0)`,
      (err, result) => {
        try {
          console.log(err)
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
          res.send(result);
          // console.log(result);
        } catch (err) {
          console.log(err);
        }
      }
    );
  },
};

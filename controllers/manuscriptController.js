const db = require("../database");

module.exports = {
  getManuscript: (req, res) => {
    db.query("SELECT * FROM naskah order by id desc", (err, result) => {
      res.send(result);
    });
  },
  addManuscript: (req, res) => {
    var data = {
      judul_naskah: req.body.judul,
      isi_naskah: req.body.isi,
      penetap: req.body.pengusul,
    };
    db.query("INSERT INTO naskah set ?", data, (err, result) => {
      try {
        if (err) throw err;
        res.send("Naskah berhasil ditambahkan!");
      } catch (err) {
        res.send(err);
      }
    });
  },
};
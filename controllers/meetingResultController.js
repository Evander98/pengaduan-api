const db = require("../database");

module.exports = {
  getResult: (req, res) => {
    db.query("SELECT * FROM hasil order by id desc", (err, result) => {
      res.send(result);
    });
  },
  addResult: (req, res) => {
    var data = {
      judul_hasil: req.body.judul,
      isi_hasil: req.body.isi,
      id_komisi: req.body.selected
    };
    db.query("INSERT INTO hasil set ?", data, (err, result) => {
      try {
        if (err) throw err;
        res.send("Hasil berhasil ditambahkan!")
      } catch (err) {
        res.send(err);
      }
    });
  },
};
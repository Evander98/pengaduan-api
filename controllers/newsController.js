const db = require("../database");

module.exports = {
  getNews: (req, res) => {
    db.query("SELECT * FROM berita order by id desc", (err, result) => {
      res.send(result);
    });
  },
  addNews: (req, res) => {
    var data = {
      judul_berita: req.body.judul,
      isi_berita: req.body.isi,
      dari: req.body.pengusul,
    };
    db.query("INSERT INTO berita set ?", data, (err, result) => {
      try {
        if (err) throw err;
        res.send("Berita berhasil ditambahkan!");
      } catch (err) {
        res.send(err);
      }
    });
  },
};
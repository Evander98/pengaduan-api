const db = require("../database");

module.exports = {
  getLegislation: (req, res) => {
    db.query("SELECT * FROM legislasi order by id desc", (err, result) => {
      res.send(result);
    });
  },
  addLegislation: (req, res) => {
    var data = {
      judul_legislasi: req.body.judul,
      isi_legislasi: req.body.isi,
      pengusul: req.body.pengusul,
    };
    db.query("INSERT INTO legislasi set ?", data, (err, result) => {
      try {
        if (err) throw err;
        res.send("Legislasi berhasil ditambahkan!");
      } catch (err) {
        res.send(err);
      }
    });
  },
};

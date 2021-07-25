const db = require("../database");

module.exports = {
  addResult: (req, res) => {
    let data = {
      judul_hasil: req.body.judul,
      isi_hasil: req.body.isi,
      id_komisi: req.body.selected
    };
    db.query("INSERT INTO hasil set ?", data, (err, result) => {
      // insert into hasil(id, judul, isi) values(1, "tes judul", "isi")
      // insert into hasil set ?
      try {
        if(err) throw err;
        res.send("Hasil berhasil ditambahkan!")
      } catch (err) {
        res.send(err)
      }
    })
  },
  getResult: (req, res) => {
    db.query("SELECT * FROM hasil", (err, result) => {
      res.send(result);
    })
  }
}
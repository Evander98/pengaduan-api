const db = require("../database");

module.exports = {
  getSchedule: (req, res) => {
    db.query("SELECT * FROM agenda order by id desc", (err, result) => {
      res.send(result);
    });
  },
  addSchedule: (req, res) => {
    var data = {
      judul_agenda: req.body.judul,
      isi_agenda: req.body.isi,
      pj: req.body.pengusul,
    };
    db.query("INSERT INTO agenda set ?", data, (err, result) => {
      try {
        if (err) throw err;
        res.send("Agenda berhasil ditambahkan!");
      } catch (err) {
        res.send(err);
      }
    });
  },
};
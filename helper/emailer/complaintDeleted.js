const complaintDeleted = (email, judul) => {
  return {
    from: `Admin <christrevand@gmail.com>`,
    to: email,
    subject: `Pengaduan anda mengandung unsur SARA`,
    html: `<p>Pengaduan anda dengan judul <b>${judul}</b> telah dihapus oleh admin karena mengandung unsur <b>SARA</b></p>`,
  };
};

module.exports = complaintDeleted;

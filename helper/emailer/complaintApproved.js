const complaintApproved = (email, judul, status) => {
  return {
    from: `Admin <christrevand@gmail.com>`,
    to: email,
    subject: `Pengaduan anda ${status == 0
      ? "BELUM DITERIMA"
      : status == 1
      ? "TELAH DITERIMA"
      : status == 2
      ? "TELAH SELESAI"
      : "STATUS ERROR"}`,
    html: `<p>Pengaduan anda dengan judul <b>${judul}</b> ${
      status == 0
        ? "<b>BELUM DITERIMA</b>"
        : status == 1
        ? "<b>TELAH DITERIMA</b>"
        : status == 2
        ? "<b>TELAH SELESAI</b>"
        : "STATUS ERROR"
    }</p>`,
  };
};

module.exports = complaintApproved;

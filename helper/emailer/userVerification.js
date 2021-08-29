const userVerification = (email) => {
  return {
    from: `Admin <christrevand@gmail.com>`,
    to: email,
    subject: `Verifikasi Email`,
    html: `<h1>Klik <a href='http://localhost:2000/auth/verify?email=${email}'>Link ini</a> Untuk verifikasi email</h1>`,
  }
}

module.exports = userVerification
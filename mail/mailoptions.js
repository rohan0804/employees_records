module.exports = function (email, text) {
    let mailOptions = {}
    mailOptions.from = 'rohanshrivastav1999@gmail.com',
        mailOptions.to = email,
        mailOptions.subject = `Email From Admin`,
        mailOptions.html = `
                        <p>Dear,<p>
                        <p>admin send you a mail</p>
                        <p>${text}</p>

                        <p>from Admin</p>

                        <p>regards</p>`
                        return mailOptions;     
}

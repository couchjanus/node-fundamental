// // Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'zb6vidra5zafwtea@ethereal.email',
            pass: '9rZTDxkZRvAeWZ9GWj'
        }
    });


module.exports = function (req, user) {

    // Message object
    let message = {
        from: 'Sender Name <no-reply@yourwebapplication.com>',
        to: `Recipient <${user.email}>`,
        subject: 'Account Verification Token ✔',
        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.verificationToken + '.\n',
        html: '<p><b>Hello</b>,<br>Please verify your account by clicking the link: <br><a href="http://' + req.headers.host + '/confirmation/' + user.verificationToken + '">Verification Token</a></p>'
    };

    transporter.sendMail(message, (err, req, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
        req.flash('loginMessage', `Your account has been created, but you must verify your email before logging in.`);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    return transporter;
};

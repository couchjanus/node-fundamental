// // Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
const shared = require('../helpers');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'zb6vidra5zafwtea@ethereal.email',
            pass: '9rZTDxkZRvAeWZ9GWj'
        }
    });


module.exports = function (req, email, passwordResetExpires, passwordResetToken) {

    // Message object
    let message = {
        from: 'Sender Name <no-reply@yourwebapplication.com>',
        to: `Recipient <${email}>`,
        subject: 'Password Reset Requested ✔',
        text: 'Hello,\n\n' + 'You are receiving this email because you requested a password reset.\n',
        html: '<p>You are receiving this email because you requested a password reset.  You have until ' + passwordResetExpires + ' to reset your password.  You may ignore this email and your password will remain unchanged.</p><a href="' + shared.constructUrl(req, '/reset/' + passwordResetToken) + '">Reset your password</a>'
    };

    transporter.sendMail(message, (err, req, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
        req.flash('loginMessage', `There was an error sending your password reset email.  Please try again.`);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    return transporter;
};

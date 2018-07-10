const nodemailer = require('nodemailer');


exports.index = (req, res, next) => {
        res.render('contact/index', { 
            title: 'Contact Us',
        });
};

exports.send = (req, res, next) => {
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'zb6vidra5zafwtea@ethereal.email',
            pass: '9rZTDxkZRvAeWZ9GWj'
        }
    });

    let mailOptions = {
        from: "'"+req.body.name+"<"+req.body.email+">'",
        to: 'zb6vidra5zafwtea@ethereal.email',
        subject: req.body.subject,
        text: 'You have a new submission with the following details... ' + req.body.message,
        html: '<p>You have a new submission with the following details... ' + req.body.message + '</p>'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        res.redirect('/contact/success');   
    });
};

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    },
});;

transporter.use('compile', hbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: 'views',//your path, views is a folder inside the source folder
        layoutsDir: 'views',
        defaultLayout: ''//set this one empty and provide your template below,
    },
    viewPath: 'views'
}));

// `to` is a string with comma seperated values
sendEmail = (invitation) => {

    return new Promise((resolve, reject) => {
        transporter.verify().then(console.log('Successfully connected to gmail')).catch(console.error);

        transporter.sendMail({
            from: process.env.EMAIL_ADDRESS, // sender address
            to: invitation.email, // list of receivers
            subject: "Subject ✔", // Subject line
            template: 'emailTemplate',
            context: {
                link: process.env.EMAIL_URL + invitation.uuid
            }
        }).then(info => {
            console.log(`Email sent successfully to : '${invitation.email}'`);
            resolve(true);
        }).catch(error => {
            console.error(error);
            reject(false);
        });

    });
}
module.exports = { sendEmail };
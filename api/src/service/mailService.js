const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    },
});;


// `to` is a string with comma seperated values
sendEmail = (to) => {

    transporter.verify().then(console.log('Successfully connected to gmail')).catch(console.error);

    transporter.sendMail({
        from: process.env.EMAIL_ADDRESS, // sender address
        to: to, // list of receivers
        subject: "Subject ✔", // Subject line
        text: "There is a new article. It's about sending emails, check it out!", // plain text body
        html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
    }).then(info => {
        console.log(`Email sent successfully to : '${to}'`);
    }).catch(console.error);
}
module.exports = { sendEmail };
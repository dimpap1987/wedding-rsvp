const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const hbs = require('nodemailer-express-handlebars');
const OAuth2 = google.auth.OAuth2;

require('dotenv').config();

const  oauth_client = new OAuth2(process.env.EMAIL_CLIENT_ID, process.env.EMAIL_SECRET_KEY);
oauth_client.setCredentials({ refresh_token : process.env.EMAIL_REFRESH_TOKEN});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type:'OAuth2',
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_SECRET_KEY,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: oauth_client.getAccessToken()
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
            subject: "Nikos & Giota ❤️", // Subject line
            template: 'emailTemplate',
            context: {
                link: process.env.INVITATION_URL + invitation.uuid
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
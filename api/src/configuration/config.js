const mongoose = require('mongoose');
require('dotenv').config();

const databaseInit = () => {
    try {
        console.log('Connecting to mongoDB...');
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', (error) => console.error(error));
        db.once('open', () => console.log("Successfully connected to database"));
    } catch (e) {
        console.log('Error while connecting to database');
    }
}

module.exports = { databaseInit };
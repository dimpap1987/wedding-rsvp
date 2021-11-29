const mongoose = require('mongoose');

const databaseInit = () => {
    mongoose.connect('mongodb://localhost/invitations', { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log("Connected to database"));
}

module.exports = { databaseInit };
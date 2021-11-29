const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({

    uuid: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: Number,
        required: false
    },
    accepted: {
        type: Boolean,
        required: true,
        default: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateAccepted: {
        type: Date
    }
});

module.exports = mongoose.model('Invitation', invitationSchema);
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
    registered: {
        type: Boolean,
        required: true,
        default: false
    },
    emailSent: {
        type: Boolean,
        required: false,
        default: false
    },
    smsSent: {
        type: Boolean,
        required: false,
        default: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateAccepted: {
        type: Date
    },
    qrcode: {
        type: String,
        required: false
    },
    numberOfAdults: {
        type: Number,
        required: false
    },
    numberOfChildren: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Invitation', invitationSchema);

const QRCode = require('qrcode');


generateQrcode = async url => {
    return QRCode.toDataURL(url);
}

module.exports = { generateQrcode };

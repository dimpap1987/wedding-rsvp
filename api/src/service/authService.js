require('dotenv').config();


generateToken = () => {
    return process.env.TOKEN;
}

authorizeRequest = (req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === process.env.TOKEN) {
        return true;
    }
    return false;
}

module.exports = { generateToken, authorizeRequest };
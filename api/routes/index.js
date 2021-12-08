var express = require('express');
var router = express.Router();
const authService = require('../src/service/authService')

router.post('/login', function (req, res, next) {
  const username = req.body?.username;
  const password = req.body?.password;

  if (username === 'nikos' && password === '1234') {
    res.json({ accessToken: authService.generateToken() });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;

const User = require('../models/User');

var express = require('express')
module.exports = app => {
    app.get('/getInfo', function (req, res) {
    res.send('Made request')
  });
}



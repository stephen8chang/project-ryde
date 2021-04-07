const User = require('../models/User');
module.exports = app => {
app.post('/api/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    // const emailExists = await User.findOne()
    console.log(firstName, lastName, email, password)
  });
}
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
mongoose.connect(
  'mongodb+srv://normanwang1234:2813959637Hi+@project-ryde.fnx34.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
dotenv.config();
const app = express();
app.use(
  session({
    secret: 'lasdjfh92394oasdhfuyasdf',
    saveUninitialized: true,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600000 * 24 * 7
    }
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
require('./routes/authRoutes')(app);
require('./routes/projectRoutes')(app);
require('./routes/hardwareRoutes')(app);
require('./routes/checkedRoutes')(app);
path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
);
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server running on ${PORT}`));

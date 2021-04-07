const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const keys = require('./config/dev');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
dotenv.config();
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Home');
});
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server running on ${PORT}`));
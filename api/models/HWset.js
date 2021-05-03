const mongoose = require('mongoose');
const { Schema } = mongoose;

const HWsetSchema = new Schema({
  name: String,
  available: Number,
  fundsPer: Number
});

const HWset = mongoose.model('hwset', HWsetSchema);
module.exports = HWset;

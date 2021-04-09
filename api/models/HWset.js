const mongoose = require('mongoose');
const { Schema } = mongoose;

const HWsetSchema = new Schema({
  HWSet1: Number,
  HWSet2: Number
});

const HWset = mongoose.model('hwset', HWsetSchema);
module.exports = HWset;

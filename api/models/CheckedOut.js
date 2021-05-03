const mongoose = require('mongoose');
const { Schema } = mongoose;

const checkedOutSchema = new Schema({
  checkedOut: { type: Number, default: 0 },
  hardware: { type: mongoose.Schema.Types.ObjectId, ref: 'HWset' }
});

const CheckedOut = mongoose.model('checkedOut', checkedOutSchema);
module.exports = CheckedOut;

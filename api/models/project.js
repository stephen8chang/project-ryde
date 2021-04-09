const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const projectSchema = new Schema({
  name: String,
  description: String,
  id: Number
});
projectSchema.pre('save', async function(next) {

  next();
});
const User = mongoose.model('projects', projectSchema);
module.exports = Projects;
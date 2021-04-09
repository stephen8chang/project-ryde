const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  creator: String,
  projectName: String,
  description: String,
  HW1Amt: Number,
  HW2Amt: Number,
  access: Boolean
});

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;

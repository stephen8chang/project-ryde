const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  creator: String,
  projectName: String,
  description: String,
  hardwareSets: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'HWset', default: [] }
  ],
  access: Boolean
});

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;

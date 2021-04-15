const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  creator: String,
  projectName: String,
  description: String,
  checkedOut: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'checkedOut', default: [] }
  ],
  access: Boolean
});

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const projectSchema = new Schema({
    projectName: String,
    id: String,
    description: String,
    HW1Amt: Number,
    HW2Amt: Number
});
projectSchema.pre('save', async function (next) {
    next();
});

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;
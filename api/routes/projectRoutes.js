const Project = require('../models/Project');
module.exports = app => {
  app.post('/api/create', async (req, res) => {
    const { projectName, description, creator } = req.body;
    const project = new Project({
      creator,
      projectName,
      description,
      hardwareSets: [],
      access: true
    });
    await project.save();
    res.send({ message: `Project named ${projectName} created!` });
  });
  app.get('/api/projects', async (req, res) => {
    const projects = await Project.find({ access: true });
    res.json(projects);
  });
  //Check in and out HWSets for project
  app.post('/api/projects/count', async (req, res) => {
    const { id, hw1Curr, hw2Curr } = req.body;
    await Project.updateOne({ _id: id }, { $set: { HW1Amt: hw1Curr } });
    await Project.updateOne({ _id: id }, { $set: { HW2Amt: hw2Curr } });
    res.send({ message: 'success' });
  });
};

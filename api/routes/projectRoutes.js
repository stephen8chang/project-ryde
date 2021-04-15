const Project = require('../models/Project');
module.exports = app => {
  //Gets all projects in database
  app.get('/api/projects/all', async (req, res) => {
    const projects = await Project.find({ access: true });
    res.json(projects);
  });
  //Create new project in database
  app.post('/api/create', async (req, res) => {
    const { projectName, description, creator, hardwareSets } = req.body;
    const project = new Project({
      creator,
      projectName,
      description,
      hardwareSets,
      access: true
    });
    await project.save();
    res.send({ message: `Project named ${projectName} created!` });
  });
  // //Check in and out HWSets for project
  // app.post('/api/projects/count', async (req, res) => {
  //   const { id, hw1Curr, hw2Curr } = req.body;
  //   await Project.updateOne({ _id: id }, { $set: { HW1Amt: hw1Curr } });
  //   await Project.updateOne({ _id: id }, { $set: { HW2Amt: hw2Curr } });
  //   res.send({ message: 'success' });
  // });
};

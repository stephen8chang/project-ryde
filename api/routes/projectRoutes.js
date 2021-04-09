const Project = require('../models/Project');
module.exports = app => {
  app.post('/api/create', async (req, res) => {
    const { projectName, description, creator } = req.body;
    const project = new Project({
      creator,
      projectName,
      description,
      HW1Amt: 0,
      HW2Amt: 0,
      access: true
    });
    await project.save();
    res.send({ message: `Project named ${projectName} created!` });
  });
  app.get('/api/projects', async (req, res) => {
    const projects = await Project.find({ access: true });
    res.json(projects);
  });
};

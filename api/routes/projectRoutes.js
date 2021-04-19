const Project = require('../models/Project');
const CheckedOut = require('../models/CheckedOut');

module.exports = app => {
  //Gets all projects in database
  app.get('/api/projects/all', async (req, res) => {
    const projects = await Project.find({ access: true }).populate({
      path: 'checkedOut',
      model: CheckedOut
    });
    res.json(projects);
  });
  //Create new project in database
  app.post('/api/projects/create', async (req, res) => {
    const { projectName, description, creator, checkedOut } = req.body;
    const project = new Project({
      creator,
      projectName,
      description,
      checkedOut,
      access: true
    });
    await project.save();
    res.send({ message: `Project named ${projectName} created!` });
  });
  app.get('/api/projects/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Project.deleteOne({ _id: id });
    res.send({ message: `Project deleted!` });
  });
  app.post('/api/projects/addHardware', async (req, res) => {
    const { checkedOut, id } = req.body;
    const project = await Project.updateOne(
      { _id: id },
      { $set: { checkedOut: checkedOut } }
    );
    res.json(project);
  });
  // //Check in and out HWSets for project
  // app.post('/api/projects/count', async (req, res) => {
  //   const { id, hw1Curr, hw2Curr } = req.body;
  //   await Project.updateOne({ _id: id }, { $set: { HW1Amt: hw1Curr } });
  //   await Project.updateOne({ _id: id }, { $set: { HW2Amt: hw2Curr } });
  //   res.send({ message: 'success' });
  // });
};

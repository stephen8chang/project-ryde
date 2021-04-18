const Project = require('../models/Project');
const CheckedOut = require('../models/CheckedOut');
const HWset = require('../models/HWset');

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
    const project = await Project.findOne({ _id: id });
    //Loops through project's checkedOut array and deletes the CheckedOut schema object associated
    project.checkedOut.forEach(async checkedOutId => {
      await CheckedOut.deleteOne({ _id: checkedOutId });
    });
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
  //Check in HWSets for project
  app.post('/api/projects/checkin', async (req, res) => {
    const { hardwareId, checkedId, qty } = req.body;
    //Updates checkedOut
    await CheckedOut.updateOne(
      { _id: checkedId },
      { $inc: { checkedOut: -Number(qty) } }
    );
    await HWset.updateOne(
      { _id: hardwareId },
      { $inc: { available: Number(qty) } }
    );
    res.json({ message: 'Succesfully Checked In.' });
  });
  //Check out HWSets for project
  app.post('/api/projects/checkout', async (req, res) => {
    const { hardwareId, checkedId, qty } = req.body;
    //Updates checkedOut
    await CheckedOut.updateOne(
      { _id: checkedId },
      { $inc: { checkedOut: Number(qty) } }
    );
    await HWset.updateOne(
      { _id: hardwareId },
      { $inc: { available: -Number(qty) } }
    );
    res.json({ message: 'Succesfully Checked Out.' });
  });
};

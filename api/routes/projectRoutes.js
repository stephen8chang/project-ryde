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
    const { projectName, description, funds, creator, checkedOut } = req.body;
    const project = new Project({
      creator,
      projectName,
      description,
      funds,
      checkedOut,
      access: true
    });
    await project.save();
    res.send({ message: `Project named ${projectName} created!` });
  });
  app.post('/api/projects/addFunds', async (req, res) => {
    const { funds, id } = req.body;
    const project = await Project.updateOne(
      { _id: id },
      { $inc: { funds: funds } }
    );
    res.json(project);
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
  //Check in HWSets for project
  app.post('/api/projects/checkin', async (req, res) => {
    const { hardwareId, checkedId, projectId, qty, fundsPer } = req.body;

    //Updates checkedOut
    let temp = qty * fundsPer
    await CheckedOut.updateOne(
      { _id: checkedId },
      { $inc: { checkedOut: -Number(qty) } }
    );
    await HWset.updateOne(
      { _id: hardwareId },
      { $inc: { available: Number(qty) } }
    );
    await Project.updateOne(
      { _id: projectId },
      { $inc: { funds: temp } }
    )
    res.json({ message: 'Succesfully Checked In.' });
  });
  //Check out HWSets for project
  app.post('/api/projects/checkout', async (req, res) => {
    const { hardwareId, checkedId, projectId, qty, fundsPer } = req.body;

    //Updates checkedOut
    let temp = qty * fundsPer
    console.log(temp)
    await CheckedOut.updateOne(
      { _id: checkedId },
      { $inc: { checkedOut: Number(qty) } }
    );
    await HWset.updateOne(
      { _id: hardwareId },
      { $inc: { available: -Number(qty) } }
    );
    await Project.updateOne(
      { _id: projectId },
      { $inc: { funds: -temp } }
    )
    res.json({ message: 'Succesfully Checked Out.' });
  });
};

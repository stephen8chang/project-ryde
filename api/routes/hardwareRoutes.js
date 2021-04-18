const HWset = require('../models/HWset');
module.exports = app => {
  //Gets all available hardware sets in database
  app.get('/api/hardware/all', async (req, res) => {
    const hw = await HWset.find({});
    res.json(hw);
  });
  app.get('/api/hardware/:id', async (req, res) => {
    const { id } = req.params;
    const hw = await HWset.find({ _id: id });
    res.json(hw);
  });
  app.post('/api/hardware/create', async (req, res) => {
    const { name, available } = req.body;
    const hardware = new HWset({
      name,
      available
    });
    await hardware.save();
    res.send({ message: `Hardware set named ${name} created!` });
  });
  app.get('/api/hardware/delete/:id', async (req, res) => {
    const { id } = req.params;
    await HWset.deleteOne({ _id: id });
    res.send({ message: `Hardware set deleted!` });
  });
};

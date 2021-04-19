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
  app.post('/api/create', async (req, res) => {
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

  // app.post('/api/hardware', async (req, res) => {
  //   const { hwName, increment, number } = req.body;
  //   const value = increment ? number : -number;
  //   const hw = await HWset.updateOne(
  //     { name: hwName },
  //     { $inc: { available: value } }
  //   );
  //   res.json(hw);
  // });
  // app.get('/api/hardware/1', async (req, res) => {
  //   const hw = await HWset.findOne({ name: 'HWSet1' });
  //   res.json(hw);
  // });
  // app.get('/api/hardware/2', async (req, res) => {
  //   const hw = await HWset.findOne({ name: 'HWSet2' });
  //   res.json(hw);
  // });
  // app.post('/api/hardware/count', async (req, res) => {
  //   const { hardware1, hardware2 } = req.body;
  //   await HWset.updateOne(
  //     { name: 'HWSet1' },
  //     { $inc: { available: hardware1 } }
  //   );
  //   await HWset.updateOne(
  //     { name: 'HWSet2' },
  //     { $inc: { available: hardware2 } }
  //   );
  //   res.send({ message: 'success' });
  // });
};

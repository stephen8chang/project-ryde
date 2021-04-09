const HWset = require('../models/HWset');
module.exports = app => {
  app.post('/api/hardware', async (req, res) => {
    const { hwName, increment, number } = req.body;
    const value = increment ? number : -number;
    const hw = await HWset.updateOne(
      { name: hwName },
      { $inc: { available: value } }
    );
    res.json(hw);
  });
  app.get('/api/hardware/1', async (req, res) => {
    const hw = await HWset.findOne({ name: 'HWSet1' });
    res.json(hw);
  });
  app.get('/api/hardware/2', async (req, res) => {
    const hw = await HWset.findOne({ name: 'HWSet2' });
    res.json(hw);
  });
  app.post('/api/hardware/count', async (req, res) => {
    const { hardware1, hardware2 } = req.body;
    await HWset.updateOne(
      { name: 'HWSet1' },
      { $inc: { available: hardware1 } }
    );
    await HWset.updateOne(
      { name: 'HWSet2' },
      { $inc: { available: hardware2 } }
    );
    res.send({ message: 'success' });
  });
};

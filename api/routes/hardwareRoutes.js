const HWSet = require('../models/HWset');
module.exports = app => {
  app.post('/api/hardware', async (req, res) => {
    const { hwName, increment, number } = req.body;
    const value = increment ? number : -number;
    const hw = await HWSet.updateOne(
      { name: hwName },
      { $inc: { available: value } }
    );
    res.json(hw);
  });
  app.get('/api/hardware/:name', async (req, res) => {
    const { name } = req.params;
    let hw = await HWSet.findOne({ name });
    res.json(hw);
  });
};

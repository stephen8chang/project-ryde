const CheckedOut = require('../models/CheckedOut');
const HWset = require('../models/HWset');
module.exports = app => {
  //Gets all available hardware sets in database
  app.post('/api/checked/create', async (req, res) => {
    const { hardwareSets } = req.body;
    let result = [];
    hardwareSets.forEach(hw => {
      const checked = new CheckedOut({
        checkedOut: 0,
        hardware: hw._id
      });
      checked.save();
      result.push(checked);
    });
    res.json(result);
  });
  app.get('/api/checked/hardware/:id', async (req, res) => {
    const { id } = req.params;
    const hw = await CheckedOut.find({ _id: id }).populate({
      path: 'hardware',
      model: HWset
    });
    res.json(hw);
  });
};

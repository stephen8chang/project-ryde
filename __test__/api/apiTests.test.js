const axios = require('axios');
const API_BASE = 'http://project-ryde.herokuapp.com'

it('checks to see if the api routes return expected result', async () => {
   const getAllProjectsMirror = async () => {
    let projects = await axios.get(API_BASE + '/api/projects/all')
    return projects.data
    };

    const getAllHardwareMirror = async () => {
        let hardwares = await axios.get(API_BASE + '/api/hardware/all')
        return hardwares.data
        };

  const projectsResponse = await getAllProjectsMirror();
  expect(projectsResponse).not.toBeNull();

  const hardwareResponse = await getAllHardwareMirror();
  expect(hardwareResponse).not.toBeNull()
});

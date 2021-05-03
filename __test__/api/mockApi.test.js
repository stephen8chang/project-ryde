// const ProjectsScreen = require('../../frontend/src/screens/ProjectsScreen')
const axios = require('axios');
jest.mock('axios');

// const getProjects = ProjectsScreen.getProjectsMirror
// const getHardwares = ProjectsScreen.getHardwaresMirror
// const getFirstHardware = ProjectsScreen.getFirstHardwareMirror

const getFirstHardwareMirror = async (_id) => {
    let hardware = await axios.get('http://localhost:9000/api/checked/hardware/' + _id);
    return hardware.data[0];
}
  
const expectedResponse = {
    userId: 1,
    id: 1,
    title: 'My First Album'
  };

it('returns the first dataset in the hardware sets', async () => {
  const fakeID = 123;
  axios.get.mockResolvedValue({
    data: [
      {
        userId: 1,
        id: 1,
        title: 'My First Album'
      },
      {
        userId: 1,
        id: 2,
        title: 'Album: The Sequel'
      }
    ]
  });

  const response = await getFirstHardware(fakeID);
  expect(response).toEqual(expectedResponseMirror);
});
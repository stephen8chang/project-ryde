const axios = require('axios');
jest.mock('axios');

const API_BASE = 'http://project-ryde.herokuapp.com/'

const mockedResponse = {
  data: [
    {
      userId: 435543,
      title: 'This is the correct result'
    },
    {
      userId: 425544,
      title: 'This is not the correct reuslt'
    }
  ]
}

it('tests the api method in ProjectsScreens by mocking api call', async () => {
  const mockID = 123;
  const getFirstHardwareMirror = async (_id) => {
    let hardware = await axios.get(API_BASE + 'api/checked/hardware/' + _id);
    return hardware.data[0];
  }

  axios.get.mockResolvedValue(mockedResponse);

  const expectedResponse = {
    userId: 435543,
    title: 'This is the correct result'
  };

  const response = await getFirstHardwareMirror(mockID);
  expect(response).toEqual(expectedResponse);
});
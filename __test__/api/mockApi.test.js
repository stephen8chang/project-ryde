const axios = require('axios');
jest.mock('axios');

it('tests the api method in ProjectsScreens by mocking api call', async () => {
  const fakeID = 123;
  const getFirstHardwareMirror = async (_id) => {
    let hardware = await axios.get('http://localhost:9000/api/checked/hardware/' + _id);
    return hardware.data[0];
  }

  axios.get.mockResolvedValue({
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
  });

  const expectedResponse =       {
    userId: 435543,
    title: 'This is the correct result'
  };

  const response = await getFirstHardwareMirror(fakeID);
  expect(response).toEqual(expectedResponse);
});
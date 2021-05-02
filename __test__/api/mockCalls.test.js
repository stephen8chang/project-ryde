const axios = require('axios');
const ProjectScreens = require('../../frontend/src/screens/ProjectsScreen')
jest.mock('axios')
const onCloseMirror = ProjectScreens.onCloseMirror

const expectedResponse = {
    desc: "correct mock test response",
    number: 1
}

describe('Mock hardware api call', () => {
    it('Mock hardware api call', async () => {
        const fakeID = 123456   
        axios.get.mockResolvedValue({
            data: [
                {
                    desc: "correct mock test response",
                    number: 1
                },
                {
                    desc: "incorrect mock test response",
                    number: 2
                }
            ]
        })   
        const response = await onCloseMirror(fakeID)
        expect(response).toEqual(1)
    });
});
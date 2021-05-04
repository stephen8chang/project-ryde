const axios = require('axios');

it('checks to see if the api routes return expected result', async () => {
   const getAllProjectsMirror = async () => {
    let projects = await axios.get('http://localhost:9000/api/projects/all')
    return projects.data
    };

    const getAllHardwareMirror = async () => {
        let hardwares = await axios.get('http://localhost:9000/api/hardware/all')
        return hardwares.data
        };

    const expectedResponseProjects = [
        {
            "checkedOut": [
                {
                    "checkedOut": 0,
                    "_id": "6081018369f3ae1118b405c7",
                    "hardware": "6081018169f3ae1118b405c6",
                    "__v": 0
                },
                {
                    "checkedOut": 0,
                    "_id": "60887054b8ad005a08093a49",
                    "hardware": "60887051b8ad005a08093a48",
                    "__v": 0
                },
                {
                    "checkedOut": 0,
                    "_id": "608f7e0ea8242966d4f3b10b",
                    "hardware": "608f670cb279b72ef78e221b",
                    "__v": 0
                }
            ],
            "projectUsers": [
                "607b990d4bc065c1a07e400a",
                "607da9994c053542f83eeb68"
            ],
            "_id": "6080ff03b664305dccde39cd",
            "creator": "stephen8chang@gmail.com",
            "projectName": "test",
            "description": "testDesc",
            "funds": 259,
            "access": true,
            "__v": 0
        },
        {
            "checkedOut": [
                {
                    "checkedOut": 0,
                    "_id": "60874543eb6aadfa107ee578",
                    "hardware": "6081018169f3ae1118b405c6",
                    "__v": 0
                },
                {
                    "checkedOut": 0,
                    "_id": "6089d78e4292ba55f0591709",
                    "hardware": "60887051b8ad005a08093a48",
                    "__v": 0
                }
            ],
            "projectUsers": [],
            "_id": "60874544eb6aadfa107ee579",
            "creator": "stephen8chang@gmail.com",
            "projectName": "test2",
            "description": "testDesc2",
            "funds": 150,
            "access": true,
            "__v": 0
        },
        {
            "checkedOut": [
                {
                    "checkedOut": 0,
                    "_id": "6089db281b1e15344073c670",
                    "hardware": "6081018169f3ae1118b405c6",
                    "__v": 0
                },
                {
                    "checkedOut": 0,
                    "_id": "6089db281b1e15344073c671",
                    "hardware": "60887051b8ad005a08093a48",
                    "__v": 0
                },
                {
                    "checkedOut": 0,
                    "_id": "608f6b00ff56cd2fd0788cd7",
                    "hardware": "608f670cb279b72ef78e221b",
                    "__v": 0
                }
            ],
            "projectUsers": [
                "6089f6476ea4e06650dcef2b"
            ],
            "_id": "6089db281b1e15344073c672",
            "creator": "stephen_chang@utexas.edu",
            "projectName": "test3",
            "description": "testDesc3",
            "funds": 100,
            "access": true,
            "__v": 0
        }
    ]

    const expectedResponseHardwares = [
        {
            "_id": "6081018169f3ae1118b405c6",
            "name": "HW1",
            "available": 90,
            "fundsPer": 2,
            "__v": 0
        },
        {
            "_id": "60887051b8ad005a08093a48",
            "name": "HW2",
            "available": 80,
            "fundsPer": 3,
            "__v": 0
        },
        {
            "_id": "608f670cb279b72ef78e221b",
            "name": "HW3",
            "available": 100,
            "fundsPer": 1,
            "__v": 0
        }
    ]
  const projectsResponse = await getAllProjectsMirror();
  expect(projectsResponse).toEqual(expectedResponseProjects);

  const hardwareResponse = await getAllHardwareMirror();
  expect(hardwareResponse).toEqual(expectedResponseHardwares)
});

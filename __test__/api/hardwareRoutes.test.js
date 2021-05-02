const axios = require('axios');

import * as ProjectsScreen from '../../frontend/src/screens/ProjectsScreen'
const fetchAllProjectsMirror = ProjectsScreen.fetchAllProjectsMirror
const fetchAllHardwaresMirror = ProjectsScreen.fetchAllHardwaresMirror

describe('Projects api call', () => {
    it('Make sure projects call is not null', async () => {      
        const response = await fetchAllProjectsMirror();
        expect(response).not.toBeNull   
    });
});


describe('Hardware api call', () => {
    it('Make sure hardware call is not null', async () => {      
        const response = await fetchAllHardwaresMirror();
        expect(response).not.toBeNull
    });
});
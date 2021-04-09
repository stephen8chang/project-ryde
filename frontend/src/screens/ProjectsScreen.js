import React from 'react';

const ProjectsScreen = () => {
  return (
    <>
      <div>
        <big>Welcome to the Projects Page! </big>
      </div>
      <div>
        <big>Here you can create or search through existing projects.</big>
      </div>
      <div>
        <button>Create Project</button>
      </div>
      <br></br>
      <table border="1px solid black">
        <tr>
          <th>Name</th><br></br>
          <th>ID</th><br></br>
          <th>Description</th><br></br>
          <th>Link to Open</th><br></br>
        </tr>
      </table>
    </>
  );
};

export default ProjectsScreen;

import React from 'react';
import './ProjectList.css';

const ProjectList = () => {
  // Dummy data for now
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', deadline: '2025-03-15' },
    { id: 2, name: 'Mobile App Dev', status: 'Planning', deadline: '2025-04-10' },
    { id: 3, name: 'API Integration', status: 'Completed', deadline: '2025-02-20' },
  ];

  return (
    <div className="project-list">
      <h3>Projects</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.status}</td>
              <td>{project.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
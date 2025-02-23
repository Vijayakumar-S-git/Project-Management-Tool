// src/components/Dashboard.jsx
import React, { useState } from 'react';
import './style.css'
const Dashboard = ({ onLogout }) => {
  // State for modals and data
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [taskForm, setTaskForm] = useState({ title: '', dueDate: '' });

  // Handle form input changes
  const handleProjectChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  const handleTaskChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  // Handle form submissions
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    setProjects([...projects, { ...projectForm, completed: false }]);
    setProjectForm({ name: '', description: '' });
    setIsProjectModalOpen(false);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...taskForm, completed: false }]);
    setTaskForm({ title: '', dueDate: '' });
    setIsTaskModalOpen(false);
  };

  // Handle removal and completion
  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const completeProject = (index) => {
    setProjects(
      projects.map((project, i) =>
        i === index ? { ...project, completed: true } : project
      )
    );
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <a href="/dashboard#projects">Projects</a>
            <a href="/dashboard#tasks">Tasks</a>
            <a href="/dashboard#team">Team</a>
            <a href="/dashboard#reports">Reports</a>
            <button onClick={onLogout}>Logout</button>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h2>Projects</h2>
          <button onClick={() => setIsProjectModalOpen(true)}>
            Create New Project
          </button>
          <ul>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <li key={index}>
                  {project.name} - {project.description}{' '}
                  {project.completed ? '(Completed)' : ''}
                  {!project.completed && (
                    <>
                      <button onClick={() => completeProject(index)}>
                        Complete
                      </button>
                      <button onClick={() => removeProject(index)}>
                        Remove
                      </button>
                    </>
                  )}
                </li>
              ))
            ) : (
              <p>No projects yet.</p>
            )}
          </ul>
        </section>

        <section>
          <h2>Tasks</h2>
          <button onClick={() => setIsTaskModalOpen(true)}>
            Add Task
          </button>
          <ul>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <li key={index}>
                  {task.title} - Due: {task.dueDate}{' '}
                  {task.completed ? '(Completed)' : ''}
                  {!task.completed && (
                    <>
                      <button onClick={() => completeTask(index)}>
                        Complete
                      </button>
                      <button onClick={() => removeTask(index)}>
                        Remove
                      </button>
                    </>
                  )}
                </li>
              ))
            ) : (
              <p>No tasks yet.</p>
            )}
          </ul>
        </section>
      </main>

      {/* Project Modal */}
      {isProjectModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Project</h2>
            <form onSubmit={handleProjectSubmit}>
              <div>
                <label>Project Name:</label>
                <input
                  type="text"
                  name="name"
                  value={projectForm.name}
                  onChange={handleProjectChange}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                  required
                />
              </div>
              <button type="submit">Add Project</button>
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <form onSubmit={handleTaskSubmit}>
              <div>
                <label>Task Title:</label>
                <input
                  type="text"
                  name="title"
                  value={taskForm.title}
                  onChange={handleTaskChange}
                  required
                />
              </div>
              <div>
                <label>Due Date:</label>
                <input
                  type="date"
                  name="dueDate"
                  value={taskForm.dueDate}
                  onChange={handleTaskChange}
                  required
                />
              </div>
              <button type="submit">Add Task</button>
              <button type="button" onClick={() => setIsTaskModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
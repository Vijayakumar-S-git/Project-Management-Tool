import asyncHandler from 'express-async-handler'; // Single import
import Project from '../../models/Projects/projectModel.js'; // Single, consistent Project import
import User from '../../models/auth/UserModel.js';

export const createProject = asyncHandler(async (req, res) => {
  const { title, description, dueDate, tasks, members } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ message: "Title and due date are required" });
  }

  const projectTasks = tasks ? tasks.map(task => ({
    taskName: task.taskName,
    taskDescription: task.taskDescription || "",
    projectTitle: title,
    dueDate: task.dueDate,
    completed: task.completed || false,
    assignedTo: task.assignedTo || null,
  })) : [];

  const project = await Project.create({
    title,
    description,
    dueDate,
    creator: req.user._id,
    tasks: projectTasks,
    members: members || [],
  });

  res.status(201).json(project);
});

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    $or: [{ creator: req.user._id }, { members: req.user._id }],
  })
    .populate("creator", "name email")
    .populate("members", "name email");

  res.status(200).json(projects);
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("creator", "name email")
    .populate("members", "name email");

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (
    !project.creator.equals(req.user._id) &&
    !project.members.some((m) => m.equals(req.user._id))
  ) {
    return res.status(403).json({ message: "Not authorized to view this project" });
  }

  res.status(200).json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (!project.creator.equals(req.user._id)) {
    return res.status(403).json({ message: "Only the creator can update this project" });
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedProject);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (!project.creator.equals(req.user._id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "Only the creator or admin can delete this project" });
  }

  await project.deleteOne();
  res.status(200).json({ message: "Project deleted" });
});

export const addMember = asyncHandler(async (req, res) => {
  const { memberId } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (!project.creator.equals(req.user._id)) {
    return res.status(403).json({ message: "Only the creator can add members" });
  }

  const user = await User.findById(memberId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (project.members.includes(memberId)) {
    return res.status(400).json({ message: "User is already a member" });
  }

  project.members.push(memberId);
  await project.save();

  const updatedProject = await Project.findById(req.params.id)
    .populate("creator", "name email")
    .populate("members", "name email");

  res.status(200).json(updatedProject);
});

export const removeMember = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (!project.creator.equals(req.user._id)) {
    return res.status(403).json({ message: "Only the creator can remove members" });
  }

  const memberId = req.params.memberId;
  if (!project.members.includes(memberId)) {
    return res.status(400).json({ message: "User is not a member of this project" });
  }

  project.members = project.members.filter((m) => !m.equals(memberId));
  await project.save();

  const updatedProject = await Project.findById(req.params.id)
    .populate("creator", "name email")
    .populate("members", "name email");

  res.status(200).json(updatedProject);
});

export const createTask = asyncHandler(async (req, res) => {
  const { taskName, taskDescription, dueDate, assignedTo } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (!project.creator.equals(req.user._id)) {
    return res.status(403).json({ message: "Only the creator can add tasks" });
  }

  if (!taskName || !dueDate) {
    return res.status(400).json({ message: "Task name and due date are required" });
  }

  const newTask = {
    taskName,
    taskDescription: taskDescription || "",
    projectTitle: project.title,
    dueDate,
    completed: false,
    assignedTo: assignedTo || null,
  };

  project.tasks.push(newTask);
  await project.save();

  res.status(201).json(project);
});

export const updateTask = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  if (!project.creator.equals(req.user._id)) {
    return res.status(403).json({ message: "Only the creator can update tasks" });
  }

  const task = project.tasks.id(req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, req.body);
  await project.save();
  res.status(200).json(project);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  if (!project.creator.equals(req.user._id)) {
    return res.status(403).json({ message: "Only the creator can delete tasks" });
  }

  project.tasks.id(req.params.taskId).remove();
  await project.save();
  res.status(200).json(project);
});
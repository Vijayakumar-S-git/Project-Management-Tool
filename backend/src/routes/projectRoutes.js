import express from "express";
import { protect, creatorMiddleware } from "../middleware/authMiddleware.js";
import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    addMember,
    removeMember,
    updateTask,
    deleteTask,
    createTask
} from "../controllers/Projects/projectController.js";

const router = express.Router();

// Protect all routes (user must be logged in)
router.use(protect);

// Project CRUD
router.post("/projects", creatorMiddleware, createProject); // Only creators/admins can create
router.get("/projects", getProjects);
router.get("/projects/:id", getProject);
router.put("/projects/:id", creatorMiddleware, updateProject);
router.delete("/projects/:id", creatorMiddleware, deleteProject);
router.put('/projects/:id/tasks/:taskId', creatorMiddleware, updateTask);
router.delete('/projects/:id/tasks/:taskId', creatorMiddleware, deleteTask);
router.post('/projects/:id/tasks', creatorMiddleware, createTask);

// Member management
router.post("/projects/:id/members", creatorMiddleware, addMember);
router.delete("/projects/:id/members/:memberId", creatorMiddleware, removeMember);

export default router;
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, "Task name is required"],
  },
  taskDescription: {
    type: String,
    default: "",
  },
  projectTitle: {
    type: String,
    required: [true, "Project title is required"],
  },
  dueDate: {
    type: Date,
    required: [true, "Task due date is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
  },
  description: {
    type: String,
    default: "",
  },
  dueDate: {
    type: Date,
    required: [true, "Project due date is required"],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required"],
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  tasks: [taskSchema],
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
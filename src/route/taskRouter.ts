import express from "express";
import {
  AddNewTask,
  CompleteTask,
  DeleteTask,
  EditTask,
  GetAllMyTask,
} from "../controller/taskController";
import { ProtectedRoute } from "../middleware";

const taskRouter = express.Router();

taskRouter.get("/mytask/:userId", ProtectedRoute, GetAllMyTask);
taskRouter.post("/addtask", ProtectedRoute, AddNewTask);
taskRouter.put("/edittask", ProtectedRoute, EditTask);
taskRouter.delete("/deletetask", ProtectedRoute, DeleteTask);
taskRouter.put("/completetask", ProtectedRoute, CompleteTask);

export default taskRouter;

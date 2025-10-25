"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controller/taskController");
const middleware_1 = require("../middleware");
const taskRouter = express_1.default.Router();
taskRouter.get("/mytask/:userId", middleware_1.ProtectedRoute, taskController_1.GetAllMyTask);
taskRouter.post("/addtask", middleware_1.ProtectedRoute, taskController_1.AddNewTask);
taskRouter.put("/edittask", middleware_1.ProtectedRoute, taskController_1.EditTask);
taskRouter.delete("/deletetask", middleware_1.ProtectedRoute, taskController_1.DeleteTask);
taskRouter.put("/completetask", middleware_1.ProtectedRoute, taskController_1.CompleteTask);
exports.default = taskRouter;
//# sourceMappingURL=taskRouter.js.map
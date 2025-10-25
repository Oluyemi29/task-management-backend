"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteTask = exports.DeleteTask = exports.EditTask = exports.AddNewTask = exports.GetAllMyTask = void 0;
const prisma_1 = require("../lib/prisma");
const GetAllMyTask = async (req, res) => {
    try {
        const Method = req.method;
        if (Method !== "GET") {
            return res.status(400).send({
                success: false,
                message: "Methods not allowed",
            });
        }
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "All field are required",
            });
        }
        const allmytasks = await prisma_1.prisma.task.findMany({
            where: {
                userId,
            },
        });
        if (allmytasks) {
            return res.status(200).send({
                success: true,
                message: "all task gotten",
                data: allmytasks,
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "An error occured",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
exports.GetAllMyTask = GetAllMyTask;
const AddNewTask = async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        if (!userId || !title || !description) {
            return res.status(400).send({
                success: false,
                message: "All field are required",
            });
        }
        const newtask = await prisma_1.prisma.task.create({
            data: {
                description,
                title,
                userId,
            },
        });
        if (newtask) {
            return res.status(200).send({
                success: true,
                message: "Task created successfully",
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "An error occured",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
exports.AddNewTask = AddNewTask;
const EditTask = async (req, res) => {
    try {
        const { title, description, userId, id } = req.body;
        if (!userId || !title || !description || !id) {
            return res.status(400).send({
                success: false,
                message: "All field are required",
            });
        }
        // checking if the task exist
        const existTask = await prisma_1.prisma.task.findUnique({
            where: {
                id,
                userId,
            },
        });
        if (!existTask) {
            return res.status(400).send({
                success: false,
                message: "Task not found",
            });
        }
        // editing task
        const edittask = await prisma_1.prisma.task.update({
            where: {
                id,
                userId,
            },
            data: {
                title,
                description,
            },
        });
        if (edittask) {
            return res.status(200).send({
                success: true,
                message: "Task edited successfully",
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "An error occured",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
exports.EditTask = EditTask;
const DeleteTask = async (req, res) => {
    try {
        const { userId, id } = req.body;
        if (!userId || !id) {
            return res.status(400).send({
                success: false,
                message: "All field are required",
            });
        }
        // checking if the task exist
        const existTask = await prisma_1.prisma.task.findUnique({
            where: {
                id,
                userId,
            },
        });
        if (!existTask) {
            return res.status(400).send({
                success: false,
                message: "Task not found",
            });
        }
        // editing task
        const deletetask = await prisma_1.prisma.task.delete({
            where: {
                id,
                userId,
            },
        });
        if (deletetask) {
            return res.status(200).send({
                success: true,
                message: "Task deleted successfully",
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "An error occured",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
exports.DeleteTask = DeleteTask;
const CompleteTask = async (req, res) => {
    try {
        const { userId, id } = req.body;
        if (!userId || !id) {
            return res.status(400).send({
                success: false,
                message: "All field are required",
            });
        }
        // checking if the task exist
        const existTask = await prisma_1.prisma.task.findUnique({
            where: {
                id,
                userId,
            },
        });
        if (!existTask) {
            return res.status(400).send({
                success: false,
                message: "Task not found",
            });
        }
        // editing task
        const completetask = await prisma_1.prisma.task.update({
            where: {
                id,
                userId,
            },
            data: {
                complete: true,
            },
        });
        if (completetask) {
            return res.status(200).send({
                success: true,
                message: "Task deleted successfully",
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "An error occured",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
exports.CompleteTask = CompleteTask;
//# sourceMappingURL=taskController.js.map
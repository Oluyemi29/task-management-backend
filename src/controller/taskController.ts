import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const GetAllMyTask = async (req: Request, res: Response) => {
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
    const allmytasks = await prisma.task.findMany({
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
    } else {
      return res.status(400).send({
        success: false,
        message: "An error occured",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};

export const AddNewTask = async (req: Request, res: Response) => {
  try {
    const { title, description, userId } = req.body;
    if (!userId || !title || !description) {
      return res.status(400).send({
        success: false,
        message: "All field are required",
      });
    }
    const newtask = await prisma.task.create({
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
    } else {
      return res.status(400).send({
        success: false,
        message: "An error occured",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};

export const EditTask = async (req: Request, res: Response) => {
  try {
    const { title, description, userId, id } = req.body;
    if (!userId || !title || !description || !id) {
      return res.status(400).send({
        success: false,
        message: "All field are required",
      });
    }

    // checking if the task exist
    const existTask = await prisma.task.findUnique({
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
    const edittask = await prisma.task.update({
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
    } else {
      return res.status(400).send({
        success: false,
        message: "An error occured",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};

export const DeleteTask = async (req: Request, res: Response) => {
  try {
    const { userId, id } = req.body;
    if (!userId || !id) {
      return res.status(400).send({
        success: false,
        message: "All field are required",
      });
    }

    // checking if the task exist
    const existTask = await prisma.task.findUnique({
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
    const deletetask = await prisma.task.delete({
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
    } else {
      return res.status(400).send({
        success: false,
        message: "An error occured",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};

export const CompleteTask = async (req: Request, res: Response) => {
  try {
    const { userId, id } = req.body;
    if (!userId || !id) {
      return res.status(400).send({
        success: false,
        message: "All field are required",
      });
    }

    // checking if the task exist
    const existTask = await prisma.task.findUnique({
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
    const completetask = await prisma.task.update({
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
    } else {
      return res.status(400).send({
        success: false,
        message: "An error occured",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};

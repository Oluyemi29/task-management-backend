import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "./lib/prisma";

interface tokenProps {
  id: string;
  iat: number;
  exp: number;
}

export const IsActive = async (req: Request, res: Response) => {
  try {
    // checking methods
    const Method = req.method;
    if (Method !== "GET") {
      return res.status(400).send({
        success: false,
        message: "Method not allowed",
      });
    }

    // checking if token is in cookies

    const token = req.cookies.task;
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "token not found",
      });
    }

    // checking is token is valid
    const user = jwt.verify(token, process.env.SECRET_KEY as string);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "invalid token",
      });
    }
    const { id } = user as tokenProps;

    // checking valid user
    const ValidUser = await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
    if (ValidUser) {
      return res.status(200).send({
        success: true,
        message: "active token",
        data: ValidUser,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "invalid user data",
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

export const ProtectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // checking if token is in cookies

    const token = req.cookies.task;
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "token not found",
      });
    }

    // checking is token is valid
    const user = jwt.verify(token, process.env.SECRET_KEY as string);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "invalid token",
      });
    }
    const { id } = user as tokenProps;

    // checking valid user in database
    const ValidUser = await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
    if (!ValidUser) {
      return res.status(400).send({
        success: false,
        message: "invalid user data",
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};

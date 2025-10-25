import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).send({
        success: false,
        message: "All field are reuired",
      });
    }

    // checking is user already exist
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existUser) {
      return res.status(400).send({
        success: false,
        message: "User already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const image = `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`;
    const data = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
        image,
      },
    });
    if (data) {
      return res.status(200).send({
        success: true,
        message: "User registered successfully",
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
      message: "an error occured",
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All field are reuired",
      });
    }

    // checking is user already exist
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    const comfirmPassword = await bcrypt.compare(password, user.password);
    if (!comfirmPassword) {
      return res.status(400).send({
        success: false,
        message: "incorrect password",
      });
    }
    const userdata = await prisma.user.findUnique({
      where: {
        email,
      },
      omit: {
        password: true,
      },
    });
    if (userdata) {
      const token = jwt.sign(
        { id: userdata.id },
        process.env.SECRET_KEY as string,
        { expiresIn: "7d" }
      );
      res.cookie("task", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.MODE?.toString() === "production" ? true : false,
      });

      return res.status(200).send({
        success: true,
        message: "User registered successfully",
        data: userdata,
        token: token,
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
      message: "an error occured",
    });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "All field are reuired",
      });
    }

    // checking is user exist
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "unauthorise access",
      });
    }
    // clearing cookies
    res.clearCookie("task");

    return res.status(200).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "an error occured",
    });
  }
};

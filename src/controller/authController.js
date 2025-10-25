"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = exports.Register = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).send({
                success: false,
                message: "All field are reuired",
            });
        }
        // checking is user already exist
        const existUser = await prisma_1.prisma.user.findUnique({
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
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const image = `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`;
        const data = await prisma_1.prisma.user.create({
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
            message: "an error occured",
        });
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "All field are reuired",
            });
        }
        // checking is user already exist
        const user = await prisma_1.prisma.user.findUnique({
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
        const comfirmPassword = await bcrypt_1.default.compare(password, user.password);
        if (!comfirmPassword) {
            return res.status(400).send({
                success: false,
                message: "incorrect password",
            });
        }
        const userdata = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
            omit: {
                password: true,
            },
        });
        if (userdata) {
            const token = jsonwebtoken_1.default.sign({ id: userdata.id }, process.env.SECRET_KEY, { expiresIn: "7d" });
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
            message: "an error occured",
        });
    }
};
exports.Login = Login;
const Logout = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "All field are reuired",
            });
        }
        // checking is user exist
        const user = await prisma_1.prisma.user.findUnique({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "an error occured",
        });
    }
};
exports.Logout = Logout;
//# sourceMappingURL=authController.js.map
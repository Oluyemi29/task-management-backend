"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = exports.IsActive = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("./lib/prisma");
const IsActive = async (req, res) => {
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
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "invalid token",
            });
        }
        const { id } = user;
        // checking valid user
        const ValidUser = await prisma_1.prisma.user.findUnique({
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
        }
        else {
            return res.status(400).send({
                success: false,
                message: "invalid user data",
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
exports.IsActive = IsActive;
const ProtectedRoute = async (req, res, next) => {
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
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "invalid token",
            });
        }
        const { id } = user;
        // checking valid user in database
        const ValidUser = await prisma_1.prisma.user.findUnique({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
exports.ProtectedRoute = ProtectedRoute;
//# sourceMappingURL=middleware.js.map
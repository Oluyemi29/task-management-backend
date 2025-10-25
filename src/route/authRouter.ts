import express from "express";
import { Login, Logout, Register } from "../controller/authController";
import { IsActive, ProtectedRoute } from "../middleware";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.delete("/logout",ProtectedRoute, Logout);
authRouter.get("/isactive", IsActive);

export default authRouter;

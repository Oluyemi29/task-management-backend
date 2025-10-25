"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const middleware_1 = require("../middleware");
const authRouter = express_1.default.Router();
authRouter.post("/register", authController_1.Register);
authRouter.post("/login", authController_1.Login);
authRouter.delete("/logout", middleware_1.ProtectedRoute, authController_1.Logout);
authRouter.get("/isactive", middleware_1.IsActive);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map
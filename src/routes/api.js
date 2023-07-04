import express from "express";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const userRouter = express.Router();
userRouter.use(authMiddleware);
userRouter.get("/api/users/current", userController.get);

export { userRouter };

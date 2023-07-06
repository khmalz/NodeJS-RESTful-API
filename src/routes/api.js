import express from "express";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import contactController from "../controller/contact-controller";
import addressController from "../controller/address-controller";

const userRouter = express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.route("/api/users/current").get(userController.get).patch(userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Contact API
userRouter.route("/api/contacts").post(contactController.create).get(contactController.search);
userRouter.route("/api/contacts/:contactId").get(contactController.get).put(contactController.update).delete(contactController.remove);

// Address API
userRouter.route("/api/contacts/:contactId/addresses").post(addressController.create).get(addressController.list);
userRouter.route("/api/contacts/:contactId/addresses/:addressId").get(addressController.get).put(addressController.update).delete(addressController.remove);

export { userRouter };

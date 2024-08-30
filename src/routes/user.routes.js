import express from "express";
import { validationMiddleware } from "../middlewares/form.validation.js";
import { UserController } from "../controllers/user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/all', userController.getAllUsers);
userRouter.post('/add', validationMiddleware, userController.addNewUser);
userRouter.post('/login', userController.signin);
userRouter.get('/details/:userId', userController.getUserById);
userRouter.delete('/remove/:userId', userController.deleteUser);
userRouter.patch('/password/reset', validationMiddleware, userController.resetPassword);
userRouter.post('/password/email', userController.mailRandomPassword);


export default userRouter;


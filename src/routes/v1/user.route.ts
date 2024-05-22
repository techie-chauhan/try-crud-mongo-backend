import userController from "@/controllers/user.controller";
import validate from "@/middlewares/validate";
import userValidation from "@/validations/user.validation";
import express from "express";

const userRouter = express.Router();

userRouter.get("/getall", userController.getallUser);

userRouter.post(
  "/add",
  validate(userValidation.addUser),
  userController.addUser,
);

userRouter.post(
  "/delete",
  validate(userValidation.deleteUser),
  userController.deleteUser,
);

userRouter.post(
  "/edit",
  validate(userValidation.editUser),
  userController.editUser,
);

export default userRouter;

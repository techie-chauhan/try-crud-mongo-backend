import express, { Request, Response } from "express";
import userRouter from "./user.route";

const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.send("v1 path");
});

const defaultRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

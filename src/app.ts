import express, { Express, Request, Response } from "express";
import helmet from "helmet";
// import xss from "xss-clean";
import compression from "compression";
import cors from "cors";
import { NOT_FOUND } from "http-status";
import router from "./routes/v1";
import ApiError from "./utils/ApiError";

const app: Express = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication

app.get("/", (_req: Request, res: Response) =>
  res.send("this is an API Server"),
);

app.use("/v1", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(NOT_FOUND, "Not found"));
});

export default app;

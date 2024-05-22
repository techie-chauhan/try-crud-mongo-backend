import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";

let server: any;

// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
mongoose.connect(config.mongoose.url).then(() => {
  console.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    console.info(`Listening to port ${config.port}`);
  });
});

// server = app.listen(config.port, () => {
//     console.log(`Listening to port ${config.port}`);
// });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

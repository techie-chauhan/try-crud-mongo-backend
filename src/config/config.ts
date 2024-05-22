import { configDotenv } from "dotenv";
import path from "path";

configDotenv({
  path: path.join(__dirname, "../../.env"),
});

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongoose: {
    url:
      process.env.MONGODB_URL +
      (process.env.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: "mySuperSecretSecret",
  },
};

export default config;

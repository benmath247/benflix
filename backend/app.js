require("dotenv").config();

const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

const MongoDB = require("./MongoDB");

const userRouter = require("./routes/user/userRouter");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  MongoDB();
  console.log(`Server is now running port ${process.env.PORT}`);
});

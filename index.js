const express = require("express");

const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middleware/index");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Connection to Mongoose
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() =>
  console.log("MongoDb Connection established")
);

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

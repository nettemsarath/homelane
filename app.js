require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;

const indexRouter = require("./src/Routes");

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, (error) => {
  if (error) {
    console.log("Error!" + error);
  }
});

app.use("/", indexRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "That route does not exist ☠️",
    status: 404,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

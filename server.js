const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

const DB_URI = process.env.MONGO_DB_URI;

function RunServer() {
  const routes = require("./routes");
  app.use("/api", routes);
  app.use(express.json());

  app.listen("8080", () => {
    console.log("Server is listening at port 8080...");
  });
}

mongoose
  .connect(DB_URI, { useNewUrlParser: true })
  .then(() => {
    RunServer();
    console.log("Database connected.");
  })
  .catch((error) => {
    console.log("Database connection failed");
    console.log(error.message);
  });

// TODO
//! APi not receiving a body

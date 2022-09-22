const express = require("express");
const url = "mongodb://localhost:27017/Validation";
const app = express();
const mongoose = require("mongoose");

// Middleware for json responses
app.use(express.json());

const runServer = () => {
  const routes = require("./routes");

  app.use("/api", routes);

  // listen to port 8080
  app.listen(8080, () => {
    console.log("Server listening on port 8080...");
  });
};

// Connection to Mongo Client

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
  },
  (error) => {
    if (error) console.log(error.message);
    runServer();
  }
);

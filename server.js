require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const roleAccess = require("./middleware/roleAccess");

const app = express();
const DB_URI = process.env.MONGO_DB_URI;

mongoose
  .connect(DB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected.");
  })
  .catch((error) => {
    console.log("Database connection failed");
    console.log(error.message);
  });

app.use(express.json());
app.use("/api", routes);

app.get("/alpha", auth, roleAccess("Alpha"), (req, res) => {
  res.status(200).send("Welcome alpha🙌 ");
});

app.get("/beta", auth, roleAccess("Beta"), (req, res, next) => {
  res.status(200).send("Welcome beta🙌 ");
});

app.listen("8080", () => {
  console.log("Server is listening at port 8080...");
});

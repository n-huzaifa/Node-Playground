require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");

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

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.listen("8080", () => {
  console.log("Server is listening at port 8080...");
});

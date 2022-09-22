const express = require("express");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const app = express();

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
mongo.connect(
  url,
  {
    useNewUrlParser: true,
  },
  (error, client) => {
    if (error) {
      console.log(error);
      return;
    }

    /**
     * Never add anything in global
     */
    global.mongoDB = client.db("Validation");

    runServer();
  }
);

const express = require("express");
const Joi = require("joi");
const { ObjectId } = require("mongodb");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const app = express();

let db, users;

// Middleware for json responses
app.use(express.json());

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
    db = client.db("Validation");
    users = db.collection("users");
  }
);

// Get all users
app.get("/users", (req, res) => {
  users.find().toArray((err, items) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ users: items });
  });
});

// Insert a new user
app.post("/user", (req, res) => {
  const data = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().integer().min(1).max(200),
    cars: Joi.array().items(Joi.string()),
  });

  const { value, error } = schema.validate(data);
  console.log(value);
  if (error) {
    res.json(error);
    return;
  }

  users.insertOne(value, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});

// Update a previous user by Id
app.put("/user/:id", (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().integer().min(1).max(200),
    cars: Joi.array().items(Joi.string()),
  });

  const { value, error } = schema.validate(data);
  console.log(value);
  if (error) {
    res.json(error);
    return;
  }

  users.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: value },
    (error) => {
      if (error) {
        res.status(500).json({ error: error });
        return;
      }
      res.status(200).json({ ok: true });
    }
  );
});

// Delete a previous user by Id
app.delete("/user/:id", (req, res) => {
  users.deleteOne({ _id: ObjectId(req.params.id) }, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: error });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});

// listen to port 8080
app.listen(8080, () => {
  console.log("Server listening on port 8080...");
});

// TODO Create and Update endpoints body validation with JOI

const express = require("express");
const { ObjectId } = require("mongodb");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const app = express();

let db, trips;

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
    db = client.db("tripcost");
    trips = db.collection("trips");
  }
);

// Get all trips
app.get("/trips", (req, res) => {
  trips.find().toArray((err, items) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ trips: items });
  });
});

// Insert a new trip
app.post("/trip", (req, res) => {
  const name = req.body.name;
  trips.insertOne({ name: name }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});

// Update a previous trip by Id
app.put("/trip/:id", (req, res) => {
  trips.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { name: req.body.name } },
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error });
        return;
      }
      res.status(200).json({ ok: true });
    }
  );
});

// Delete a previous trip by Id
app.delete("/trip/:id", (req, res) => {
  trips.deleteOne({ _id: ObjectId(req.params.id) }, (error, result) => {
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

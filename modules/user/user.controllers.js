const { userValidation } = require("./user.validation");
const { ObjectId } = require("mongodb");

const users = global.mongoDB.collection("users");

async function getUsersController(req, res) {
  try {
    const users = await users.find().toArray();

    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unknown error occurred" });
  }
}

async function getUserController(req, res) {
  try {
    const user = await users.findOne({ _id: ObjectId(req.params.id) });
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unknown error occurred" });
  }
}

async function insertUserController(req, res) {
  const data = req.body;

  try {
    const { value, error } = userValidation.validate(data);
    console.log(value);
    if (error) {
      console.log("Validation error", JSON.stringify(error.details));
      throw new Error("Validation error");
    }

    await users.insertOne(value);

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unknown error occurred" });
  }
}

async function updateUserController(req, res) {
  const data = req.body;

  try {
    const { value, error } = userValidation.validate(data);
    console.log(value);
    if (error) {
      console.log("Validation error", JSON.stringify(error.details));
      throw new Error("Validation error");
    }

    await users.updateOne({ _id: ObjectId(req.params.id) }, { $set: value });
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unknown error occurred" });
  }
}

async function deleteUserController(req, res) {
  try {
    await users.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getUserController,
  getUsersController,
  insertUserController,
  updateUserController,
  deleteUserController,
};

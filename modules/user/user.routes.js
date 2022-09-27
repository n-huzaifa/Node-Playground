const {
  getUsersController,
  insertUserController,
  updateUserController,
  deleteUserController,
  getUserController,
} = require("./user.controllers");

const router = require("express").Router();

// Get all users
router.get("/", getUsersController);

// Get a single user
router.get("/:id", getUserController);

// Insert a new user
router.post("/", insertUserController);

// Update a previous user by Id
router.put("/:id", updateUserController);

// Delete a previous user by Id
router.delete("/:id", deleteUserController);

module.exports = router;

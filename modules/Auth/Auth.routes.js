const router = require("express").Router();
const { signupController: signupController } = require("./Auth.controller.js");

router.post("/signup", signupController);

module.exports = router;

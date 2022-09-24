const router = require("express").Router();
const { signupController, loginController } = require("./Auth.controller.js");

router.post("/signup", signupController);
router.post("/login", loginController);

module.exports = router;

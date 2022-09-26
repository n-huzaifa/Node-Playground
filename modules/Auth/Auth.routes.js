const router = require("express").Router();
const { signupController, loginController } = require("./Auth.controller.js");
const Validator = require("../../middleware/validator");
const {
  loginValidation,
  signupValidation,
} = require("../../modules/Auth/Auth.validation");

router.post("/signup", Validator(signupValidation), signupController);
router.post("/login", Validator(loginValidation), loginController);

module.exports = router;

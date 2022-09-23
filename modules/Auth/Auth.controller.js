const User = require("../../model/users");
const { signupValidation } = require("./Auth.validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signupController(req, res) {
  try {
    const data = req.body;

    const { value, error } = signupValidation.validate(data);
    if (error) {
      res.status(500).json({ error: error.details });
    }
    const { first_name, last_name, email, password } = value;
    const userAlreadyExists = User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { signupController };

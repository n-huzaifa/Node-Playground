const User = require("../../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function safeUserModel(user) {
  const safeData = user;
  delete safeData.password;
  return safeData;
}

async function signupController(req, res) {
  try {
    const data = req.body;

    const { first_name, last_name, email, password } = data;
    const userAlreadyExists = await User.findOne({ email });

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
      process.env.AUTH_TOKEN_SECRET
    );

    // safe datA
    const safeData = safeUserModel(user.toObject());

    // save user token
    safeData.token = token;

    res.status(201).json(safeData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

async function loginController(req, res) {
  try {
    const data = req.body;

    const { email, password } = data;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      res
        .status(401)
        .json({ error: "No user exists with this email. First signup!" });
      return;
    }

    const passMatch = await bcrypt.compare(password, userExists.password);

    if (!passMatch) {
      res.status(500).json({ error: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign(
      {
        userId: userExists._id,
        email,
      },
      process.env.AUTH_TOKEN_SECRET
    );

    userExists.token = token;

    const user = safeUserModel(userExists.toObject());
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  signupController,
  loginController,
};

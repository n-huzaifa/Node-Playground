const router = require("express").Router();
const authRoutes = require("./modules/Auth/Auth.routes");
const auth = require("./middleware/auth");

router.use("/auth", authRoutes);

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;

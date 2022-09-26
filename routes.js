const router = require("express").Router();
const authRoutes = require("./modules/Auth/Auth.routes");

router.use("/auth", authRoutes);

module.exports = router;

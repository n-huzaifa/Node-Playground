const userRoutes = require("./modules/user/user.routes");

const router = require("express").Router();

router.use("/user", userRoutes);

module.exports = router;

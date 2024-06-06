const express = require("express");
let router = express();

const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const taskRouter = require("./taskRoute");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/task", taskRouter);

module.exports = router;
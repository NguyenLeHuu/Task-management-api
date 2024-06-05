const express = require("express");
let router = express();

const userRoute = require("./userRoute");
const taskRouter = require("./taskRoute");

router.use("/user", userRoute);
router.use("/task", taskRouter);

module.exports = router;
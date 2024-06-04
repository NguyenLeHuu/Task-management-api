const promiseRouter = require("express-promise-router");
const taskContronller = require("../controllers/taskContronller");

let route = promiseRouter();

route.post("/store", taskContronller.store);
route.get("/", taskContronller.findAll);
route.get("/:id", taskContronller.find);
route.put("/:id", taskContronller.update);
route.delete("/:id", taskContronller.delete);

module.exports = route;
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const route = require("./src/route/index.js");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
});

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn mỗi IP chỉ được gửi tối đa 100 request trong 15 phút
  message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút",
  headers: true, // Bao gồm các header về giới hạn
});
app.use(limiter);

// Routes
app.get("/", (req, res) => {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(
    '<h1><a style="color:green" href="http://localhost:3000/api-docs">Click here to redirect to Swagger Documentation</a></h1>'
  );
});
app.use("/", route);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

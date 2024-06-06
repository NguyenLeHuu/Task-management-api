const options = {
    openapi: "3.0.0",
    language: "en-US",
    disableLogs: false,
    autoHeaders: true,
    autoQuery: true,
    autoBody: true,
  };
  
  const swaggerAutogen = require("swagger-autogen")(options);
  const path = require("path");
const User = require("./src/models/user.js");
const Task = require("./src/models/task.js");

const m2s = require('mongoose-to-swagger');

const swaggerSchema = {
  user: m2s(User),
  task: m2s(Task),
}

  
  const outputFile = `swagger_output.json`;
  const endpointsFiles = [`${__dirname}/src/route/index.js`];
  
  let port = process.env.PORT || 3000; // use process.env to get value from .env
  
  const doc = {
    info: {
      version: "1.0.0", // by default: '1.0.0'
      title: "Task Manager API - Nguyen Le Huu K15 FPT", // by default: 'REST API'
      description: "user of system has 2 role : PM (CRUD task, assign task to dev) and dev(default role when create account, CRUD their account, See list tasks)", // by default: ''
    },
    basePath: "/", // by default: '/'
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "local server",
      },
    ],
    components: {
      schemas:swaggerSchema,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    
  };
  
  swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    await import("./server.js"); // Your project's root file
  });
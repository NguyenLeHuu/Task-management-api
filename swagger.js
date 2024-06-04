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
  
  // const outputFile = `${__dirname}/swagger_output.json`;
  // const endpointsFiles = [`${__dirname}/route/Route.js`];
  const outputFile = `swagger_output.json`;
  const endpointsFiles = [`${__dirname}/src/route/index.js`];
  
  let port = process.env.PORT || 3000; // use process.env to get value from .env
  
  const doc = {
    info: {
      version: "1.0.0", // by default: '1.0.0'
      title: "Nguyen Le Huu K15 FPT", // by default: 'REST API'
      description: "Task Manager API", // by default: ''
    },
    basePath: "/", // by default: '/'
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "local server",
      },
      // {
      //   // url: `https://ec2-54-169-148-196.ap-southeast-1.compute.amazonaws.com`,
      //   url: `https://clinicsystem.io.vn/`,
      //   description: "Server in hosting",
      // },
    ],
    components: {
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
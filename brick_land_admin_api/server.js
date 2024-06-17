const http = require("http");
const app = require("./app");
const port = 5000;
const server = http.createServer(app);
const { dbConnect } = require("./helper/dbConnection");
const { createSuperAdmin } = require("./createSuperAdmin");

dbConnect().then((_) => {
  // createSuperAdmin();
  server.listen(port, (_) => console.log(`Server is Running on port ${port}`));
});

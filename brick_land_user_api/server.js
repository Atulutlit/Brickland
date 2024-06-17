const http = require("http");
const app = require("./app");
const port = 3311;
const server = http.createServer(app);
const { dbConnect } = require("./helper/dbConnection");

dbConnect().then((_) => {
  server.listen(port, (_) => console.log(`Server is Running on port ${port}`));
});

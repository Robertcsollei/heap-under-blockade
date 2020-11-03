//Initializing server
const appName = "Server API"; 
const port = process.env.PORT || 8080;
const createServer = require("./app");
const server = createServer();
server.listen(port, () => console.log(`${appName} running on port ${port}!`));


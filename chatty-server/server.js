// server.js

const express = require("express");
const SocketServer = require("ws").Server;
const uuidV1 = require("node-uuid");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
      // client.send(JSON.stringify(notification));

  });
};

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {



    data = JSON.parse(data);
    data.id = uuidV1()
    if (data.type === "postNotification") {
      data.type = "incomingNotification"
    } else if (data.type === "postMessage") {
      data.type = "incomingMessage"
    } else {
      data.type = "nonsense, please ignore";
    }
    // console.log("DESPAIR:", data)
    wss.broadcast(data);



  });




  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => console.log("Client disconnected"));
});
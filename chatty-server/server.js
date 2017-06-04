// server.js

const express = require("express");
const SocketServer = require("ws").Server;
const uuidV1 = require("node-uuid");

// Set the port to 3001
const PORT = 3001;

// Creates new express server
const server = express()
  // Makes the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcasts the data as a string for each user connected
wss.broadcast = function broadcast(data) {
  const packet = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    try {
      client.send(packet);
    } catch (ex) {
      console.error("Client went away...");
    }
  });
};

// Outputs a random colour from the array
function pickColor() {
  // added more than 4 colors because was having trouble getting a variety for screenshots
  var colors = [
    "#f98866",
    "#ff420E",
    "#80BD9E",
    "#89DA59",
    "#ff33CC",
    "#00CCFF",
    "#3333CC",
    "#990099"
  ];
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  return random_color;
}

// Parses the data and sets id to a unique id, sets data type from post to incoming for message + noifications and then broadcasts the data
function handleMessage(data) {
  data = JSON.parse(data);
  data.id = uuidV1();

  //could change to string.repl
  if (data.type === "postNotification") {
    data.type = "incomingNotification";
  } else if (data.type === "postMessage") {
    data.type = "incomingMessage";
  }
  wss.broadcast(data);
}

// Broadcasts the # of users online with a unique id
function updateOnlineCount() {
  wss.broadcast({
    id: uuidV1(),
    type: "onlineUsers",
    onlineUsers: wss.clients.size
  });
}

// Passes color to each new user
function handleConnection(client) {
  console.log("New client connected!");
  console.log("We are at " + wss.clients.size + " clients!");

  client.send(
    JSON.stringify({
      type: "setColor",
      userColor: pickColor()
    })
  );

  updateOnlineCount();

  client.on("message", handleMessage);
  // Callback for when a client closes the socket.
  client.on("close", () => {
    console.log("Client disconnected");
    updateOnlineCount();
  });
}

wss.on("connection", handleConnection);

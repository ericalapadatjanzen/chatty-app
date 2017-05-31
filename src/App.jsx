import React, {Component} from "react";
// import uuidV1 from "node-uuid";

import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"

// import Message from "./Message.jsx"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Erica"},
      messages: [ ]
    };

this.addNewMessage = this.addNewMessage.bind(this);
  }


   addNewMessage(name, content) {
    const message = {
      id: this.state.messages.length +1,
      username: name,
      content
    };
    this.socket.send(JSON.stringify(message));

    const newMessages = this.state.messages.concat(message);
    this.setState({messages: newMessages})
    console.log("content", content);

  }

  componentDidMount() {

    this.socket = new WebSocket("ws://127.0.0.1:3001");
    this.socket.onmessage = function(message) {
      console.log("Received message:", message);
  };
    this.socket.onopen = function(event) {
       console.log("connected to Server")
    };


}

  render() {
    console.log("Rendering <App/>");

    return (

      <div className = "messageContainer">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList messages = {this.state.messages}/>

      <ChatBar user={this.state.currentUser.name} newMessage={this.addNewMessage}/>


      </div>
    );

  }
}


export default App;

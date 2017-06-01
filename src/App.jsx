import React, {Component} from "react";
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"

// import Message from "./Message.jsx"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: "",
      messages: []
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    // this.addNewNotification =this.addNewNotification.bind(this);
    this.addNewUserName = this.addNewUserName.bind(this);
  }

  addNewNotification(note){
    const notification = {
      type: "postNotification",
      content: note

    }
    this.socket.send(JSON.stringify(notification));
    console.log("notification", notification)
  }


  addNewMessage(content) {
    const message = {
      username: this.state.username,
      content,
      type: "postMessage"
    };
    this.socket.send(JSON.stringify(message));

    console.log("message", message)

  }

  addNewUserName(oldUsername, newUserName){
    this.setState({username:newUserName});
    this.addNewNotification(`${oldUsername || "anonymous"} changed their name to ${newUserName}`)

    }




  componentDidMount() {

    this.socket = new WebSocket("ws://127.0.0.1:3001");
    console.log("this.state.messages", this.state.messages)

    this.socket.onmessage = (message) => {
      console.log("this", this)

      const incomingObj = JSON.parse(message.data);


      let notices = [];
      notices = this.state.messages.concat(incomingObj);
      console.log(notices);
      this.setState({messages: notices});

  };
    this.socket.onopen = function(event) {
       console.log("connected to Server")
    };


}

  render() {

    return (

      <div className = "messageContainer">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList messages = {this.state.messages}/>

      <ChatBar username={this.state.username}
        newMessage={this.addNewMessage}
        newUserName={this.addNewUserName} />


      </div>
    );

  }
}


export default App;

import React, {Component} from "react";


class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user,
      content: ""
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    // this.props.addNewMessage =this.props.addNewMessage.bind(this);

  }



  onNameChange(event) {
    console.log("name change event", event.target.value);
    this.setState({username: event.target.value});
  }

  onContentChange(event) {
    console.log("content change event", event.target.value);
    this.setState({content: event.target.value})
  }

  onKeyPress(event){
    if (event.key === "Enter") {
      this.props.newMessage(this.state.username, this.state.content);
      console.log("Enter key pressed");
    }
    // console.log("event", event.charCode, event.keyCode, event.key, event.which)
  }

  render() {
  console.log("Rendering <ChatBar/>");

    return (

        <footer className="chatbar">
          <input className="chatbar-username" value={this.state.username} onChange={this.onNameChange} />
          <input className="chatbar-message" value={this.state.content} onChange={this.onContentChange} onKeyDown={this.onKeyPress}/>
        </footer>

    );
  }
}
export default ChatBar;
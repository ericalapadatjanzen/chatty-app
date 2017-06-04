import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "anonymous",
      content: "",
      note: ""
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  onNameChange(event) {
    this.setState({ username: event.target.value });
  }
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }
  onKeyPress(event) {
    if (event.key === "Enter") {
      this.props.newMessage(this.state.content);
      this.setState({ content: "" });
    }
  }

  onUserNameChange = event => {
    if (event.type === "blur" || (event.key && event.key === "Enter")) {
      this.props.newUserName(this.state.username);
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          value={this.state.username}
          onChange={this.onNameChange}
          onBlur={this.onUserNameChange}
          onKeyDown={this.onUserNameChange}
        />
        <input
          className="chatbar-message"
          value={this.state.content}
          onChange={this.onContentChange}
          onKeyDown={this.onKeyPress}
        />
      </footer>
    );
  }
}
export default ChatBar;

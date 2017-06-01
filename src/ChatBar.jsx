import React, {Component} from "react";


class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      content: "",
      note: "",

    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    // this.onKeyDownUser = this.onKeyDownUser.bind(this);

  }


  onNameChange(event) {
    this.setState({username: event.target.value});
  }

  onContentChange(event) {
    this.setState({content: event.target.value})
  }



  onKeyPress(event){
    if (event.key === "Enter") {
      this.props.newMessage(this.state.content);
      this.setState({content: ""});
      // this.props.newUserName(this.state.username);
      console.log("Enter key pressed");
    }
  }

onUserNameChange = (event) => {
  if(event.type === "blur" || (event.key && event.key === "Enter")){
    if(this.props.username !== this.state.username){
      this.props.newUserName(this.props.username, this.state.username)
    }
  }
}


//   onKeyDownUser(event){
//     if (event.key === "Enter") {
//     this.props.newUserName(this.state.username);
//     console.log("Enter key pressed");
//   }
// }

//   onBlur(event){
//     this.props.newUserName(this.state.username);
//     this.props.newNotification(this.state.note);
//     }




  render() {

    return (

        <footer className="chatbar">
          <input className="chatbar-username"
            value={this.state.username}
            onChange={this.onNameChange}
            onBlur={this.onUserNameChange}
            onKeyDown={this.onUserNameChange}
            />
          <input className="chatbar-message"
            value={this.state.content}
            onChange={this.onContentChange}
            onKeyDown={this.onKeyPress}
            />
        </footer>

    );
  }
}
export default ChatBar;
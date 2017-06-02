import React, {Component} from "react";


export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <span href="/" className="navbar-brand">Chatty</span>
        <span className="onlineCount">{this.props.onlineUsers} user(s) online</span>
      </nav>
    );
  }
}
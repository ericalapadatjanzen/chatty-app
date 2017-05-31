import React, {Component} from 'react';

import Message from './Message.jsx'

class MessageList extends Component {

  render() {

    const messages = this.props.messages.map(message =>{
      return <Message
        key= {message.id}
        user= {message.username}
        content= {message.content}
      />

    });
  console.log("Rendering <MessageList/>");

    return (

        <main className="messages">
          { messages }
        </main>

    );
  }
}
export default MessageList;
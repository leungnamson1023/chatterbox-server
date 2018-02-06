import React from 'react'
import Chat from './Chat.jsx';
const Chatbox = (props) => {
  return props.chatsData.map(message=>{
    return(
    <div className="jumbotron" >
      <Chat username={message.username} message={message.text}/>
    </div>
    );
  });
  


};

export default Chatbox;


// <Chat username={message.username} message={message.text}/>
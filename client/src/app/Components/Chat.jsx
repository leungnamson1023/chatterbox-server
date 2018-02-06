import React from 'react';

const Chat = (props) => (
  <div>
    <div className = "messageUsername">
      <h2>{props.username}</h2>
    </div>
    <div className = "messageText">
      <p>{props.message}</p>
    </div>
  </div>
);

export default Chat;
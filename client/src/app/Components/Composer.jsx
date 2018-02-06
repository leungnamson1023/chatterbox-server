import React from 'react';

const Composer = (props) => (
  <div>
    <h1>{props.username}</h1>
    <input type='text-area' onChange={(e) => props.onMessageChange(e.target.value)}></input>
    <button onClick={() => props.messageSubmit()}>Submit</button>
  </div>

) 

export default Composer;
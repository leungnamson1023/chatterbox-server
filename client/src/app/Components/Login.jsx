import React from 'react';

const Login = (props) => (
  <div>
    <input type="text" placeholder="Enter Username" onChange = {(e) => props.onInputChange(e.target.value)}></input>
    <button onClick = {() => props.loginSubmit()}>Submit</button>
  </div>
);    

export default Login;
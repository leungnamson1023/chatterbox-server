import React from 'react';
import Bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.css';
import {render} from 'react-dom';
import Login from './Components/Login.jsx';
import Composer from './Components/Composer.jsx';
import Chatbox from './Components/Chatbox.jsx';
import exampleData from './data/exampleData.js';
import{getData, sendData} from './data/dataAccess.js';
import {jumbotron} from 'react-bootstrap'
import $ from 'jquery';
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      message: '',
      text: '',
      roomname: 'lobby',
      data: this.props.data
      
    }
    this.loginSubmit = this.loginSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.invoke = this.invoke.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.getMessageData = this.getMessageData.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
  }
/*------------------RENDER------------------ */
  componentDidMount(){
    this.invoke();
  }

   /*------------------LOGIN COMPONENT------------------ */
  loginSubmit () {
    
    this.setState({username: this.state.text});
    

  }

  onInputChange (input) {
    this.setState({text: input});

  }
  


  /*---------------COMPOSER COMPONENT--------------------- */
  onMessageChange (input) {
    this.setState({message: input});

  }
  
  getMessageData(data){
    
    this.setState({data: data})
  }

  invoke() {

    getData(this.getMessageData);
  }

  messageSubmit () {
    sendData({username: this.state.username, text: this.state.message, roomname: this.state.roomname}, this.invoke);
  }
  



  render () {
    return (
      <div>
        <div>
          <Login  onInputChange={this.onInputChange} loginSubmit={this.loginSubmit}/>
        </div>
        <div>
          <Composer onMessageChange={this.onMessageChange} messageSubmit={this.messageSubmit} username={this.state.username}/>
        </div>
        <div className="container">
          <Chatbox chatsData={this.state.data} />
        </div>
      </div>
    );
  }
}



render(<App data={exampleData}/>, document.getElementById('app'));
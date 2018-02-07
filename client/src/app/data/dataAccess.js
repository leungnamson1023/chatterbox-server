
const sendData = (message, callback) => {
  console.log(message, ' message coming in');
  $.ajax({
    'method': 'POST',
    'url': 'http://127.0.0.1:3000/classes/messages',
    'contentType': 'application/json',
    'data': JSON.stringify({username: message.username, text: message.text, roomname: message.roomname})
  }).done(function(data) {
    console.log(data, 'SEND DATA');
    callback();  
  }).fail(function(data) {
    console.log('No data');
  });
};
const getData = (callback) => {
  $.ajax({
    'method': 'GET',
    'url': 'http://127.0.0.1:3000/classes/messages',
  }).done(function(data) {
    console.log(data, 'This is get data ......');
    callback(data.results);
  }).fail(function(data) {
    console.log('No data');
  });

};

export {sendData, getData};
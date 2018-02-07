var request = require('request');
var expect = require('chai').expect;
const chai = require('chai'), spies = require('chai-spies');
// const app = require('../../../client/app/index.jsx');







describe('server', function() {
  it('should respond to GET requests for /classes/messages with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back parsable stringified JSON', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      done();
    });
  });

  it('should send an object containing a `results` array', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests to /classes/messages', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with messages that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messages = JSON.parse(body).results;
        console.log(messages, 'tttttttttt');
        expect(messages[0].username).to.equal('Jono');
        expect(messages[0].message).to.equal('Do my bidding!');
        done();
      });
    });
  });

  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('Should send back a header', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(response.headers).to.exist;
      done();
    });
  });


  // it('Should re-render the page when new data is submitted to the server', function(done) {
  //   request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
  //     expect(/*an invokation of render from the App class in index.jsx to be equal to an invoked function)*/);
  //     done();
  //   });
  // });

  // it('Should retain the information that was entered when the page refresh/reloads', function(done) {
  //   request('http://127.0.0.1:3000/classes/messages', function(error, response, body) { // 
  //     /*we can check whether the length of the results array is equal to it being greater than 1?? */
  //     expect(app.invoke()).to.have.been.called();
  //     done();
  //   });
  // });


});

require('dotenv').load();

var request = require('then-request');
var prompt = require('prompt');
var Lob = require('lob')('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

var schema = {
  properties: {
    name: {
      description: "From Name",
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    address_line1: {
      description: "From Address Line 1",
      message: "An address is required",
      required: true
    }, 
    address_line2: {
      description: "Enter Address Line 2, if available",
    },
    address_city: {
      description: "From City",
      message: "A city name is required",
      required: true
    },
    address_state: {
      description: "From State",
      message: "A state abbreviation or name is required",
      required: true
    },
    address_zip: {
      description: "From Zip Code",
      message: "Please enter a valid zip code",
      pattern: /[0-9]{5}/,
      required: true
    },
  }
};

prompt.start();

prompt.get(schema, function(err, result) {
  request('GET', 'https://www.googleapis.com/civicinfo/v2/representatives', {
    qs: {
      key: process.env.GOOGLE_API_KEY,
      roles: 'legislatorUpperBody',
      address: result.address_state
    }
  })
  .done(function(results) {
    if (results.statusCode === 200) {
      var sender = result;
      var official = JSON.parse(results.body).officials[0];
      var recipient = {
        name: official.name,
        address_line1: official.address[0].line1,
        address_city: official.address[0].city,
        address_state: official.address[0].state,
        address_zip: official.address[0].zip,
        address_country: 'US',
      }
      if (official.address[0].line2) {
        recipient.address_line2 = official.address[0].line2;
      }
      Lob.letters.create({
        description: 'Demo Letter',
        to: recipient,
        from: sender,
        file: '<html style="padding-top: 3in; margin: .5in;">This is a test letter sent to Senator {{name}}</html>',
        data: {
          name: recipient.name
        },
        color: true
      }, function (err, res) {
        if (err) {
          return console.error('Something went wrong. We\'re looking into it.');
        }
        console.log('Sent! View a digital version of your letter at: ', res.url);
      });
    } else {
      console.error('We could not retrieve information about your senator from Google. Please try again and make sure your input is valid.');
    }
  })
});
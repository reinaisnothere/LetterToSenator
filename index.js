require('dotenv').load();
var request = require('then-request');
var prompt = require('prompt');

var schema = {
  properties: {
    "From Name": {
      description: "From Name",
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    "From Address Line 1": {
      description: "From Address Line 1",
      message: "An address is required",
      required: true
    }, 
    "From Address Line 2": {
      description: "Enter Address Line 2, if available",
    },
    "From City": {
      description: "From City",
      message: "A city name is required",
      required: true
    },
    "From State": {
      description: "From State",
      message: "A state abbreviation or name is required",
      required: true
    },
    "From Zip Code": {
      description: "From Zip Code",
      message: "Please enter a valid zip code",
      pattern: /[0-9]{5}/
    },
  }
};

prompt.start();

prompt.get(schema, function(err, result) {
  request('GET', 'https://www.googleapis.com/civicinfo/v2/representatives', {
    qs: {
      key: process.env.GOOGLE_API_KEY,
      roles: 'legislatorUpperBody',
      address: result['From State']
    }
  })
  .done(function(results) {
    if (results.statusCode === 200) {
      var official = JSON.parse(results.body).officials[0];
      var toName = official.name;
      var toAddressLine1 = official.address[0].line1;
      var toAddressLine2 = official.address[0].line2; //can be undefined
      var toCity = official.address[0].city;
      var toState = official.address[0].state;
      var toZip = official.address[0].zip;
    } else {
      console.error('Something went wrong. Please try again and make sure your input is valid.');
    }
  })
});
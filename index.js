require('dotenv').load();

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
    "Message": {
      description: "Message",
      message: "Please enter your message to the senator",
      required: true
    }
  }
};

prompt.start();

prompt.get(schema, function(err, result) {
  console.log(result);
});


// From Name: Joe Schmoe

// From Address Line 1: 185 Berry Street

// From Address Line 2: Suite 170

// From City: San Francisco

// From State: CA

// From Zip Code: 94107

// Message: This is a test letter for Lob’s coding challenge. Thank you legislator.
# LetterToSenator
A command line app that generates letters to your state's senator given your address.

1. [Requirements](#requirements)
2. [Usage](#usage)
  1. [Installing dependencies](#installing-dependencies)
  2. [Setting up environment variables](#setting-up-environment-variables)
  3. [Starting the server locally](#starting-the-server-locally)

##Requirements
Node

##Usage

###Installing dependencies
From the root directory of the app:
```npm install```

###Setting up environment variables
Step 1: From the root directory of the app, create a `.env` file:

```touch .env```

Step 2: Open `.env` in your text editor, add your Google API Key (make sure you get a server key) and Lob API Key in the following format:

`GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"`

`LOB_API_KEY="YOUR_LOB_API_KEY_HERE"`

###Starting the server locally
From the root directory of the app:
```npm start```

Follow prompts from the command line to send your letter!


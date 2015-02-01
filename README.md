# Virtual Remote

A small web app built using nodejs to allow a user to control the mouse and volume on a laptop from a phone through a web browser.

## Dependencies

- node.js >= 0.10.33
- xdotool

## Installation

Currently only tested on xubuntu 14.10

    sudo apt-get install xdotool
    npm install

## Running

On the laptop run:

    > node app.js
  
This will start a web server which can be accessed from a phone (N.B. there is no password!). Navigate to http://<ip address>:3000 in a browser on the phone.

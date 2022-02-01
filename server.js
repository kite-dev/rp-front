// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(port, (err) => {
  if (err) {
    console.error('Unable to listen for connections', err);
    process.exit(1);
  }
  console.log('running on port', port);
});

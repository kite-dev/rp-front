// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/rp-front'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/rp-front/index.html'));
});
// Start the app by listening on the default
// Heroku port
app.listen(port, (err) => {
  if (err) {
    console.error('Unable to listen for connections', err);
    process.exit(1);
  }
  console.log('running on port', port);
});

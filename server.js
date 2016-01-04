var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

// We point to our static assets
app.use(express.static(publicPath));

if (!isProduction) {
    var bundle = require('./server/bundle.js');
    bundle();

    app.all('/build/*', function(req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });
}

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});

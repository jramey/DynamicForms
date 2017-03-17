var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var directory = __dirname;
var http = require('http').Server(app);

app.use(express.static(directory));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.get('/', function(req, res) {
    res.sendFile(directory + '/index.html');
})

app.get('/home', function(req, res) {
    res.sendFile(directory + '/index.html');
})

app.listen(port);
console.log("App listening on port " + port);
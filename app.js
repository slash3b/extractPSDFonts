var port = 9000;
var express = require('express');
var app = express();
var bodyParser =  require("body-parser");

//Here we are registering the middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.set("views", "./views");
app.set("view engine", "pug");

// ROUTES
app.get('/', function (req, res) {
  res.render("index");
});

// app.post('/', function (req, res) {
//
// });

app.listen(port, function () {
  console.log('App is listening on  port ' + port);
});

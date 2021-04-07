var express = require("express");
var app = express();

// Load routing
require("./routing/index")(app);

var server = app.listen(5000, function () {
  console.log("Running on :5000");
});

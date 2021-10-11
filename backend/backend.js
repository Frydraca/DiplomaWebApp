import express from "express";
import cors from "cors";
var app = express();
import pkg from "body-parser";
const { json } = pkg;
// Load routing
import routes from "./routing/index.js";
//require("./routing/index")(app);

app.use(json());
app.use(cors());
routes(app);

var server = app.listen(5000, function () {
  console.log("Running on :5000");
});

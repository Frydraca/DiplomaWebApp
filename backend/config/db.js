const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/AiDesignerApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;

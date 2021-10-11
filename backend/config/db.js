import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/AiDesignerApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;

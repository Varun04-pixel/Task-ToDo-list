import mongoose from "mongoose";
import "dotenv/config";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const dbModel = new mongoose.model("todo", todoSchema);

export default dbModel;

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import serverRoute from "./Routes/route.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());
app.use("/", serverRoute);

async function connectDB() {
  await mongoose.connect(process.env.MongoDB_key);
  console.log("Connected to MongoDB");
}
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});

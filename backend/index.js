import express, { json } from "express";
import authRoutes from "./routes/auth.routes.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(json());
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

const connectMongo = async () => {
  try {
    console.log("Connecting to MongoDB");
    await mongoose.connect(
      "mongodb+srv://rafael:rafael@cluster0.b3s742f.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");
  } catch (e) {
    console.log(e);
  }
};

app.listen(port, () => {
  connectMongo();
  console.log(`Server is running on port ${port}`);
});

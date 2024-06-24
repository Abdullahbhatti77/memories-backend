import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import Router from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();

// app.use(cors());
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET, POST, PUT, DELETE, PATCH", // Specify the allowed methods
  allowedHeaders: "Content-Type, Authorization", // Specify the allowed headers
};
app.use(cors(corsOptions));

dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(bodyParser.json());
app.use("/posts", Router);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToMongoDB();
});

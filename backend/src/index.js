import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/database.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = new Express();
const PORT = process.env.PORT || 5001;

//mongoDB connection
connectDB();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);

// routes middeleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todos", todoRoutes);

//sample demo route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

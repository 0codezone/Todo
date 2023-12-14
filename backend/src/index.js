import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import connectDB from "./config/database.js";

const app = new Express();
const PORT = 5000;

//mongoDB connection
connectDB();

// middleware
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/api/todos", todoRoutes);

//sample demo route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

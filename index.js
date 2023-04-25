import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from "./routes/user.js";
import postRouter from "./routes/posts.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Middleware
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// Routes
app.use("/posts", postRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

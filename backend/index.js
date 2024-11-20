import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth.route.js";
import { connectDB } from "./src/lib/db.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});

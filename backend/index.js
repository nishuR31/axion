// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
dotenv.config();

const PORT = process.env.PORT || 8001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

// routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/", async (req, res) => {
  return res.status(200).json({ message: "Server fired up" });
});

app.all(async (error, req, res, next) => {
  return res.status(404).json({ message: error });
});

server.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server fired up : http://localhost:${PORT}`);
});

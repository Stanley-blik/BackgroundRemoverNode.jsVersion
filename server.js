//Code by StaNLink Dev Team 
require("dotenv").config();
‎const express = require("express");
‎const bodyParser = require("body-parser");
‎
‎const app = express();
‎app.use(bodyParser.json()); // Parse JSON payloads
‎
‎// Endpoint for Telegram webhook (optional)
‎app.post(`/bot${process.env.BOT_API_TOKEN}`, (req, res) => {
‎  console.log("Webhook update received:", req.body);
‎  res.sendStatus(200); // Respond with 200 OK to Telegram
‎});

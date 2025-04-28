//Code by StaNLink Dev Team.2025
require("dotenv").config();
‎const TelegramBot = require("node-telegram-bot-api");
‎const axios = require("axios");
‎
‎const token = process.env.BOT_API_TOKEN;
‎const bot = new TelegramBot(token, { polling: true });
‎
‎// Welcome Message
‎bot.onText(/\/start/, (msg) => {
‎  bot.sendMessage(
‎    msg.chat.id,
‎    "🎨 Welcome to Bg_RemoverBot!\nSend me an image, and I'll remove its background!"
‎  );
‎});
‎
‎// Help Command
‎bot.onText(/\/help/, (msg) => {
‎  bot.sendMessage(
‎    msg.chat.id,
‎    "🔹 Commands:\n/start - Start the bot\n/help - Get instructions\n/remove - Upload an image to remove the background\n/about - Learn more about Bg_RemoverBot"
‎  );
‎});
‎
‎// About Command
‎bot.onText(/\/about/, (msg) => {
‎  bot.sendMessage(
‎    msg.chat.id,
‎    "🔹 Bg_RemoverBot is your instant background removal assistant. Developed by StaNLink Dev Team! 🚀🔥"
‎  );
‎});
‎
‎// Image Handling
‎bot.on("photo", async (msg) => {
‎  const chatId = msg.chat.id;
‎
‎  try {
‎    const fileId = msg.photo[msg.photo.length - 1].file_id;
‎    const fileUrl = await bot.getFileLink(fileId);
‎
‎    bot.sendMessage(chatId, "⏳ Processing your image...");
‎
‎    const response = await axios.post(
‎      "https://api.remove.bg/v1.0/removebg",
‎      {
‎        image_url: fileUrl,
‎        size: "auto",
‎      },
‎      {
‎        headers: {
‎          "X-Api-Key": process.env.REMOVE_BG_API_KEY,
‎        },
‎      }
‎    );
‎
‎    bot.sendPhoto(chatId, response.data.data.result_b64, {
‎      caption: "✨ Here's your image with the background removed!",
‎    });
‎  } catch (error) {
‎    console.error("Error processing image:", error);
‎    bot.sendMessage(
‎      chatId,
‎      "❌ Sorry, I couldn't process your image. Please try again later."
‎    );
‎  }
‎});

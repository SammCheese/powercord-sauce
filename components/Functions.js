// Copy-Pasted from Invisible-Chats Functions.js

const { getModule, channels } = require("powercord/webpack")

const { createBotMessage } = getModule([ "createBotMessage" ], false)
const { receiveMessage }   = getModule([ "receiveMessage" ], false)

// Send Botmessage to current Channel
exports.sendBotMessage = (content) => {
  const received = createBotMessage(channels.getChannelId(), "");
  received.embeds.push(content);
  return receiveMessage(received.channel_id, received);
}

// If Base Embed Should be Used
exports.reply = (title, content, footer) => {
  this.sendBotMessage(
    Object.assign(
      {
        title: title,
        description: content,
        footer: {
          text: "Made with ❤️ by Sammy!",
        },
      },
      embed
    )
  );
}
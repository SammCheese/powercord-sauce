// ? Taken from Invisible-Chat by c0dine
// ? https://github.com/c0dine/invisible-chat/blob/e5403fb811a9999ba5ca67f5085b00f772118874/index.js#L71-L76

const { getModule, channels, FluxDispatcher } = require("powercord/webpack");

const { createBotMessage } = getModule(["createBotMessage"], false);
const { receiveMessage } = getModule(["receiveMessage"], false);

var received = {};

// Send Botmessage to current Channel
exports.sendBotMessage = (content) => {
  received = createBotMessage(channels.getChannelId(), "");
  received.embeds.push(content);
  Object.assign(received, (application = { id: "nhentaiPlugin" })); // needed for the button recognition
  return receiveMessage(received.channel_id, received);
};

// Update Previous Botmessage (Thanks Oocrop)
exports.updateMessage = (embeds) => {
  received.embeds[0] = embeds;
  FluxDispatcher.dispatch({
    type: "MESSAGE_UPDATE",
    message: received,
  });
};

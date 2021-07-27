// ? Taken from Invisible-Chat by c0dine
// ? https://github.com/c0dine/invisible-chat/blob/e5403fb811a9999ba5ca67f5085b00f772118874/index.js#L71-L76

const { getModule, channels } = require('powercord/webpack');

const { createBotMessage } = getModule([ 'createBotMessage' ], false);
const { receiveMessage }   = getModule([ 'receiveMessage' ], false);

// Send Botmessage to current Channel
exports.sendBotMessage = (content) => {
  const received = createBotMessage(channels.getChannelId(), '');
  received.embeds.push(content);
  return receiveMessage(received.channel_id, received);
};

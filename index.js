const { Plugin } = require('powercord/entities');

const SauceRegex = /\/g\/[0-9]{1,6}/;
const chatembed = require('./components/chatembed');

const nhentai = require('nhentai');
const api = new nhentai.API();

module.exports = class TheSauce extends Plugin {
  startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'sauce',
      aliases: [ 'nhentai' ],
      description: 'Look up your Sauce in discord!',
      usage: '[prefix]sauce < Sauce Code | Sauce Link | Random >',
      executor: async (args) => {
        if (args[0] && args[0].startsWith('https://nhentai.net')) {
          args[0] = args[0].match(SauceRegex)[0].replace('/g/', '');
        }
        if (args[0] === 'Random'.toLowerCase() || !args[0]) {
          args[0] = await api.randomDoujinID();
        }
        return chatembed.executor(args[0]);
      }
    });
  }

  pluginWillUnload () {
    powercord.api.commands.unregisterCommand('sauce');
  }
};

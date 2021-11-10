const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');

const SauceRegex = /\/g\/[0-9]{1,6}/;
const SauceButton = require('./components/SauceButton');
const chatembed = require('./components/chatembed');
const { inject, uninject } = require('powercord/injector');

const nhentai = require('nhentai');
const api = new nhentai.API();

module.exports = class TheSauce extends Plugin {

  async _injectEmbed() {
    const d = (m) => {
      const def = m.__powercordOriginal_default ?? m.default;
      return typeof def === 'function' ? def : null;
    };
    const MessageHeader = await getModule((m) =>
      d(m)?.toString().includes('MessageContent')
    );
    inject('sauce-button', MessageHeader, 'default', ([props], res) => {
      const isNhentai = res.props.children.props.children[2].props.children;
      try {
        if (isNhentai[2].props.message.id === 'nhentaiPlugin') { // make sure embed was sent by the plugin
          isNhentai.push(
            React.createElement('span', {
              className: 'sauce-buttons'
            }, React.createElement(SauceButton, { props: [props], page: 0 }))); // need to reset page to 1
        }
      } catch {}
      return res;
    });
  }

  startPlugin() {
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
        return chatembed.executor(args[0], null, false);
      }
    });
    this._injectEmbed();
  }

  pluginWillUnload() {
    uninject('sauce-button');
    powercord.api.commands.unregisterCommand('sauce');
  }
};

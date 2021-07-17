const { Plugin } = require("powercord/entities");
const Functions = require("./components/Functions");

const SauceRegex = /\/g\/[0-9]{1,6}/;
const chatembed = require('./components/chatembed');

const nhentai = require("nhentai");
const api = new nhentai.API();

module.exports = class TheSauce extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "sauce",
      aliases: ["nhentai"],
      description: "Look up your Sauce in discord!",
      usage: "< Sauce Code | Sauce Link | Tag | Random >",
      executor: async ([url]) => {
        if (!url) return "I require arguments, dummy!";

        if (url.startsWith("https://nhentai.net")) {
          url = url.match(SauceRegex)[0].replace("/g/", "");
        }

        if (url == "Random".toLowerCase()) {
          url = await api.randomDoujinID()
        }
        else {
          url = await api.searchByTagID(url)
        }

        return chatembed.executor(url);
      },
      autocomplete: ([url]) => {
        if (url.length !== 1) {
          return false;
        }
        let options = {
          Sauce: 'Get Data from Code or link. i.e 52672 or https://nhentai.net/g/52672/',
          random: "Get a Random Doujin from nhentai.net"
        }
        return {
          commands: Object.keys(options)
            .filter((option) => option.includes(url[0].toLowerCase()))
            .map((option) => ({
              command: option,
              description: options[option],
            })),
          header: "Sauce Commands",
        };
      }
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("sauce");
  }
};

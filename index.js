const { Plugin } = require("powercord/entities");
const Functions = require("./components/Functions");

const SauceRegex = /\/g\/[0-9]{1,6}/;
const chatembed = require("./components/chatembed");

const nhentai = require("nhentai");
const api = new nhentai.API();

module.exports = class TheSauce extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "sauce",
      aliases: ["nhentai"],
      description: "Look up your Sauce in discord!",
      usage: "[prefix]sauce < Sauce Code | Sauce Link | Random >",
      executor: async (args) => {
        if (args[1] && args[1].startsWith("https://nhentai.net")) {
          args[1] = args[1].match(SauceRegex)[0].replace("/g/", "");
        }
        if (args[0] == "Random".toLowerCase() || !args[1]) {
          args[1] = await api.randomDoujinID();
        }

        return chatembed.executor(args[1]);
      },
      autocomplete: (args) => {
        if (args.length !== 1) {
          return false;
        }
        let options = {
          random: "Get a Random Doujin from nhentai.net",
          Sauce:
            "Get Data from Code or link. i.e 52672 or https://nhentai.net/g/52672/",
        };
        return {
          commands: Object.keys(options)
            .filter((option) => option.includes(args[0].toLowerCase()))
            .map((option) => ({
              command: option,
              description: options[option],
            })),
          header: "Sauce Commands",
        };
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("sauce");
  }
};

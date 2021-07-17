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
      executor: async ([args]) => {
        if (!args) {
          args = await api.randomDoujinID(); //Failsafe
        }

        if (args.startsWith("https://nhentai.net")) {
          args = args.match(SauceRegex)[0].replace("/g/", "");
        }

        if (args == "Random".toLowerCase()) {
          args = await api.randomDoujinID();
        }

        return chatembed.executor(args);
      },
      autocomplete: ([args]) => {
        if (args.length !== 1) {
          return false;
        }
        let options = {
          Sauce:
            "Get Data from Code or link. i.e 52672 or https://nhentai.net/g/52672/",
          random: "Get a Random Doujin from nhentai.net",
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

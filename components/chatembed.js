const { imageWH, sendBotMessage } = require("../components/Functions");

const nhentai = require("nhentai");
const api = new nhentai.API();

let embed = {
  type: "rich",
  url: "",
  title: "",
  description: "",
  image: {},
  color: "0x45f5f5",
  footer: {
    text: "",
  },
};

module.exports = {
  executor: async (Code) => {
    api.fetchDoujin(Code).then(doujin => {
      let cover = doujin.cover.url;
      embed.description = `Tags: ${doujin.tags.all.map(tag => tag.name).join(', ')}`;
      embed.title = doujin.titles.pretty;
      embed.url = doujin.url;
      embed.image = {
        url: cover,
        width: doujin.cover.width,
        height: doujin.cover.height
      };
      embed.footer.text = `${doujin.url}`
      return sendBotMessage(embed);
    });
  }
};

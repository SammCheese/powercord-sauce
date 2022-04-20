const { sendBotMessage, updateMessage } = require("../components/Functions");

const nhentai = require("nhentai");
const api = new nhentai.API();

module.exports = {
  executor: async (Code, page, isUpdate, messageObject) => {
    const { cover, id, length, tags, titles, url, pages } =
      await api.fetchDoujin(Code);

    const getDescription = () => {
      let description = `Tags: ${tags.tags
        .map((tag) => tag.name)
        .join(', ')}`;

      if (tags.characters.length > 0) {
        description += `\n\nCharacters: ${tags.characters
          .map((char) => char.name)
          .join(', ')}`;
      }

      return description;
    };

    const embed = {
      type: 'rich',
      url,
      title: titles.pretty,
      description: getDescription(),
      image: {
        proxy_url: `https://external-content.duckduckgo.com/iu/?u=${cover.url}`,
        url: `https://external-content.duckduckgo.com/iu/?u=${cover.url}`,
        width: cover.width,
        height: cover.height
      },
      color: '0x45f5f5',
      footer: {
        text: `${id} | ${length} Pages`
      }
    };

    if (isUpdate) {
      embed.image = {
        proxy_url: `https://external-content.duckduckgo.com/iu/?u=${pages[page].url}`,
        url: `https://external-content.duckduckgo.com/iu/?u=${pages[page].url}`,
        width: pages[page].width,
        height: pages[page].height
      };
      embed.footer.text = `${id} | ${length} Pages | Page ${page + 1} / ${length}`;
      return updateMessage(messageObject, embed);
    }

    return sendBotMessage(embed);
  }
};

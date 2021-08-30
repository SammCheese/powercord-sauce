const { Button } = require("powercord/components");
const { open } = require("powercord/modal");
const { React } = require("powercord/webpack");

const chatembed = require("./chatembed");

var page = 0;
var doujinNumber;
var maxPages;

module.exports = class DounjinButtons extends React.PureComponent {
  constructor(props) {
    super(props);

    doujinNumber = parseInt(
      props.props[0].childrenMessageContent.props.message.embeds[0].footer.text.split(
        "|"
      )[0]
    );
    maxPages = parseInt(
      props.props[0].childrenMessageContent.props.message.embeds[0].footer.text
        .split("|")[1]
        .split(" ")[1] // Please dont yell at me for this
    );
    maxPages = maxPages - 1;
  }

  calcPage(add) {
    try {
      if (page < 0) {
        page = 0
        return 0;
      }
      if (page > maxPages) {
        page = maxPages
        return maxPages;
      }
      if (add === false) {
        page--
        return page
      }
      if (add === true) {
        page++
        return page;
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    page = 0;
  }

  render() {
    return (
      <div>
        <text style={{color: 'white'}}>You need to dismiss this embed to open a new one</text>
        <Button
          style={{ position: "absolute", left: 5, bottom: "60%" }}
          look={Button.Looks.SUCCESS}
          color={Button.Colors.BLUE}
          size={Button.Sizes.SMALL}
          onClick={() => chatembed.executor(doujinNumber, this.calcPage(true), true)}
        >
          Next
        </Button>
        <Button
          style={{ position: "absolute", left: 5, bottom: "50%" }}
          look={Button.Looks.SUCCESS}
          color={Button.Colors.BLUE}
          size={Button.Sizes.SMALL}
          onClick={() => chatembed.executor(doujinNumber, this.calcPage(false), true)}
        >
          Prev
        </Button>
        <Button
          style={{ position: "absolute", left: 5, bottom: "40%" }}
          look={Button.Looks.SUCCESS}
          color={Button.Colors.BLUE}
          size={Button.Sizes.SMALL}
          onClick={() => {
            {
              chatembed.executor(doujinNumber, 0, true);
            }
            page = 0;
          }}
        >
          Page 0
        </Button>
      </div>
    );
  }
};

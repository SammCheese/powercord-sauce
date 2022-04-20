const { Button } = require("powercord/components");
const { React, getModule } = require("powercord/webpack");

const chatembed = require("./chatembed");
const f = require("./Functions")

let page = 0;
let doujinNumber;
let maxPages;

module.exports = class DounjinButtons extends React.PureComponent {
  constructor(props) {
    super(props);

    doujinNumber = parseInt(
      props.props[0].childrenMessageContent.props.message.embeds[0].footer.text.split('|')[0]
    );
    maxPages = parseInt(
      props.props[0].childrenMessageContent.props.message.embeds[0].footer.text
        .split('|')[1]
        .split(' ')[1] // Please dont yell at me for this
    );
  }

  calcPage(add) {
    try {
      if (page < 0) {
        page = 0;
        return 0;
      }
      if (page >= maxPages) {
        page = maxPages;
        return maxPages;
      }
      if (!add) {
        page--;
        return page;
      }
      if (add) {
        page++;
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
        <text style={{ color: 'white' }}>You need to dismiss this embed to open a new one</text>
        <Button
          style={{ position: 'absolute', left: 5, bottom: '60%' }}
          look={Button.Looks.SUCCESS}
          color={Button.Colors.BLUE}
          size={Button.Sizes.SMALL}
          onClick={() => chatembed.executor(doujinNumber, this.calcPage(true), true, this.props.props[0].childrenMessageContent.props.message)}
        >
          Next
        </Button>
        <Button
          style={{ position: 'absolute', left: 5, bottom: '50%' }}
          look={Button.Looks.SUCCESS}
          color={Button.Colors.BLUE}
          size={Button.Sizes.SMALL}
          onClick={() => chatembed.executor(doujinNumber, this.calcPage(), true, this.props.props[0].childrenMessageContent.props.message)}
        >
          Prev
        </Button>
        <Button
          style={{ position: 'absolute', left: 5, bottom: '40%' }}
          look={Button.Looks.SUCCESS}
          color={Button.Colors.BLUE}
          size={Button.Sizes.SMALL}
          onClick={() => {
            { chatembed.executor(doujinNumber, 0, true, this.props.props[0].childrenMessageContent.props.message); } page = 0; 
          }}
        >
          Page 1
        </Button>
        <Button
          style={{ position: 'absolute', left: 5, bottom: '30%' }}
          look={Button.Looks.SUCCESS}
          color={Button.Colors.BLUE}
          size={Button.Sizes.SMALL}
          onClick={() => {
            f.dismissMessage(this.props.props[0].childrenMessageContent.props.message);
          }}
        >
          Dismiss
        </Button>
      </div>
    );
  }
};

import Blockly from "node-blockly/browser";

export const tradingBlock = {
  name: "Trading Block",
  category: "Trading",
  block: {
    init: function () {
      this.jsonInit({
        type: "tradingblock",
        message0: "Trading %1",
        args0: [
          {
            type: "input_statement",
            name: "trading",
            check: "TradeTask",
          },
        ],
        previousStatement: [
          "MainBlock",
          "ActionBlock",
          "ResearchBlock",
          "TradeBlock",
        ],
        nextStatement: "TradeBlock",
        colour: 330,
        tooltip:
          "Block to add Trading tasks to the script.\n" +
          "Mandatory Input: None\n" +
          "Previous Connection: MainBlock, ActionBlock, ResearchBlock, TradeBlock\n" +
          "Next Connection: TradeBlock or nothing\n" +
          "Statement type: TradeBlock",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var statements_trading = Blockly.JavaScript.statementToCode(
      block,
      "trading"
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "this.Trading(playerId" + statements_trading + ");\n";
    return code;
  },
};

export default tradingBlock;

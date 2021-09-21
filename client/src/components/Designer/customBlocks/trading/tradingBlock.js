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
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: "",
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

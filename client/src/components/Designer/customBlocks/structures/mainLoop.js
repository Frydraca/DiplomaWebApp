import Blockly from "node-blockly/browser";

export const mainLoop = {
  name: "MainLoop",
  category: "Structures",
  block: {
    init: function () {
      this.jsonInit({
        type: "main_loop",
        message0: "Statements %1",
        args0: [
          {
            type: "input_statement",
            name: "Block",
            check: "MainBlock",
          },
        ],
        colour: 20,
        tooltip:
          "The basic block of the script.\n" +
          "Mandatory input: None\n" +
          "Optional input: ActionBlock, ResearchBlock, TradeBlock\n" +
          "Statement type: MainBlock",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var statements_block = Blockly.JavaScript.statementToCode(block, "Block");
    // TODO: Assemble JavaScript into code variable.
    var code = statements_block;
    return code;
  },
};

export default mainLoop;

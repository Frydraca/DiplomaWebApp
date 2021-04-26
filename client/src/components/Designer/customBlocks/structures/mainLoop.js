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
          },
        ],
        previousStatement: null,
        colour: 20,
        tooltip: "",
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

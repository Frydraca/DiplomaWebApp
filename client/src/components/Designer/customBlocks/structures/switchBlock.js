import Blockly from "node-blockly/browser";

export const switchBlock = {
  name: "Switch",
  category: "Structures",
  block: {
    init: function () {
      this.jsonInit({
        type: "switch",
        message0: "Input %1 Action %2",
        args0: [
          {
            type: "input_value",
            name: "Input",
          },
          {
            type: "input_statement",
            name: "Action",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 20,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_input = Blockly.JavaScript.valueToCode(
      block,
      "Input",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var statements_action = Blockly.JavaScript.statementToCode(block, "Action");
    // TODO: Assemble JavaScript into code variable.
    var code = "...;";
    return code;
  },
};

export default switchBlock;

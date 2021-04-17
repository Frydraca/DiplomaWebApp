import Blockly from "node-blockly/browser";

export const block = {
  name: "Block",
  category: "Structures",
  block: {
    init: function () {
      this.jsonInit({
        type: "block",
        message0: "Trigger %1 Action %2",
        args0: [
          {
            type: "input_statement",
            name: "Trigger",
            check: "Trigger",
          },
          {
            type: "input_statement",
            name: "Action",
            check: ["Block", "Action"],
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
    var statements_trigger = Blockly.JavaScript.statementToCode(
      block,
      "Trigger"
    );
    var statements_action = Blockly.JavaScript.statementToCode(block, "Action");
    // TODO: Assemble JavaScript into code variable.
    var code =
      "if(" + statements_trigger + ") {\n" + "" + statements_action + "};\n";
    return code;
  },
};

export default block;

import Blockly from "node-blockly/browser";

export const onlyAction = {
  name: "Only Action",
  category: "Structures",
  block: {
    init: function () {
      this.jsonInit({
        type: "structure_action",
        message0: "Action %1",
        args0: [
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
    var statements_action = Blockly.JavaScript.statementToCode(block, "Action");
    // TODO: Assemble JavaScript into code variable.
    var code = "this.Do(" + statements_action + ");\n";
    return code;
  },
};

export default onlyAction;

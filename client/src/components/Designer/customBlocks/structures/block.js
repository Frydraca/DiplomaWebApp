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
            check: ["Action", "CombatGroup"],
          },
        ],
        previousStatement: [
          "MainBlock",
          "ActionBlock",
          "ResearchBlock",
          "TradeBlock",
        ],
        nextStatement: "ActionBlock",
        colour: 20,
        /* eslint-disable no-useless-concat */
        tooltip:
          "Block to add Actions with Triggers to the script. The specified action(s) will only run if the trigger condition is true.\n" +
          "Mandatory Input: At least one Trigger and one Action or CombatGroup statement.\n" +
          "Previous Statement: MainBlock or ActionBlock\n" +
          "Next Statement: ActionBlock or nothing\n" +
          "Statement type: ActionBlock",
        /* eslint-disable no-useless-concat */
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
    var code =
      "if(" + statements_trigger + ") {\n" + statements_action + "};\n";
    return code;
  },
};

export default block;

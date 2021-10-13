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
            check: ["Action", "CombatGroup"],
          },
        ],
        previousStatement: [
          "MainBlock",
          "ActionBlock",
          "ResearchBlock",
          "TradeBlock",
        ],
        nextStatement: ["ActionBlock"],
        colour: 20,
        tooltip:
          "Block to add Actions to the script.\n" +
          "Mandatory Input: At least one Action or CombatGroup statement.\n" +
          "Previous Connection: MainBlock, ActionBlock, ResearchBlock, TradeBlock\n" +
          "Next Connection: ActionBlock or nothing\n" +
          "Statement type: ActionBlock",
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

import Blockly from "node-blockly/browser";

export const ifElse = {
  name: "If Else",
  category: "Structures",
  block: {
    init: function () {
      this.jsonInit({
        type: "structure_ifelse",
        message0: "Condition %1 True Action %2 False Action %3",
        args0: [
          {
            type: "input_statement",
            name: "Condition",
            check: "Trigger",
          },
          {
            type: "input_statement",
            name: "TrueAction",
            check: ["Action", "CombatGroup"],
          },
          {
            type: "input_statement",
            name: "FalseAction",
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
        tooltip:
          "Block to add Actions with Triggers to the script with an if-else fork. If the trigger condition is true, then the action(s) in the true branch will run, if the condition is false, then the action(s) in the false branch will run.\n" +
          "Mandatory Input: At least one Trigger and one Action or CombatGroup statement.\n" +
          "Previous Statement: MainBlock or ActionBlock\n" +
          "Next Statement: ActionBlock or nothing\n" +
          "Statement type: ActionBlock",
        helpUrl: "",
        //mutator: "controls_if_mutator",
      });
    },
  },
  generator: (block) => {
    var statements_condition = Blockly.JavaScript.statementToCode(
      block,
      "Condition"
    );
    var statements_trueaction = Blockly.JavaScript.statementToCode(
      block,
      "TrueAction"
    );
    var statements_falseaction = Blockly.JavaScript.statementToCode(
      block,
      "FalseAction"
    );
    statements_condition = statements_condition.substring(
      0,
      statements_condition.length - 2
    );
    // TODO: Assemble JavaScript into code variable.
    var code =
      "if(" +
      statements_condition +
      "){" +
      statements_trueaction +
      "}" +
      "else {" +
      statements_falseaction +
      "};";
    return code;
  },
};

export default ifElse;

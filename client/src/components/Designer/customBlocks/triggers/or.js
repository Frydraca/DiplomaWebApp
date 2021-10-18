import Blockly from "node-blockly/browser";

export const orBlock = {
  name: "OR Block",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "or",
        message0: "Condition A %1 OR %2 Condition B %3",
        args0: [
          {
            type: "input_statement",
            name: "ConditionA",
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "ConditionB",
          },
        ],
        previousStatement: "Trigger",
        nextStatement: "Trigger",
        colour: 230,
        tooltip:
          "Combine two trigger conditions in an OR relation.\n" +
          "Mandatory input: At least one Trigger for each input field\n" +
          "Previous Statement: Trigger\n" +
          "Next Statement: Trigger or nothing\n" +
          "Statement type: Trigger",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var statements_conditiona = Blockly.JavaScript.statementToCode(
      block,
      "ConditionA"
    );
    var statements_conditionb = Blockly.JavaScript.statementToCode(
      block,
      "ConditionB"
    );
    // TODO: Assemble JavaScript into code variable.
    var code =
      "(" + statements_conditiona + ") || (" + statements_conditionb + ") &&";
    return code;
  },
};

export default orBlock;

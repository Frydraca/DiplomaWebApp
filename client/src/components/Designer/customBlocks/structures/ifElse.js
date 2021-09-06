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
            check: "Action",
          },
          {
            type: "input_statement",
            name: "FalseAction",
            check: "Action",
          },
        ],
        previousStatement: "Structure",
        nextStatement: "Structure",
        colour: 20,
        tooltip: "",
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
    // TODO: Assemble JavaScript into code variable.
    var code =
      "if(" +
      statements_condition +
      "){\n" +
      statements_trueaction +
      "}\n" +
      "else {\n" +
      statements_falseaction +
      "};\n";
    return code;
  },
};

export default ifElse;

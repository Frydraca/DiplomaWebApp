import Blockly from "node-blockly/browser";

export const researchBlock = {
  name: "Research Block",
  category: "Research",
  block: {
    init: function () {
      this.jsonInit({
        type: "research",
        message0: "Research %1",
        args0: [
          {
            type: "input_statement",
            name: "Research",
            check: "ResearchTask",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 120,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var statements_research = Blockly.JavaScript.statementToCode(
      block,
      "Research"
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "...;\n";
    return code;
  },
};

export default researchBlock;

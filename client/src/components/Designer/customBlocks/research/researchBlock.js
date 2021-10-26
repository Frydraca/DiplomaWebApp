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
        previousStatement: [
          "MainBlock",
          "ActionBlock",
          "ResearchBlock",
          "TradeBlock",
        ],
        nextStatement: "ResearchBlock",
        colour: 120,
        tooltip:
          "Block to add Research tasks to the script.\n" +
          "Mandatory Input: None\n" +
          "Previous Connection: MainBlock, ActionBlock, ResearchBlock, TradeBlock\n" +
          "Next Connection: ResearchBlock or nothing\n" +
          "Statement type: ResearchBlock",
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
    var code = "this.Research(playerId" + statements_research + ");";
    return code;
  },
};

export default researchBlock;

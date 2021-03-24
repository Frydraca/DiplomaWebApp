import Blockly from "node-blockly/browser";

export const mainLoop = {
  name: "MainLoop",
  category: "Structures",
  block: {
    init: function () {
      this.jsonInit({
        type: "main_loop",
        message0: "Statements %1",
        args0: [
          {
            type: "input_statement",
            name: "Block",
          },
        ],
        previousStatement: null,
        colour: 20,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var statements_block = Blockly.JavaScript.statementToCode(block, "Block");
    // TODO: Assemble JavaScript into code variable.
    var code =
      'var gameState = require("./gameState.json");\n\n' +
      "var events = true;\n\n" +
      "var gameRuns = true;\n" +
      "var gameTurn = 1;\n" +
      "while (gameRuns) {\n" +
      "\tlet currentTurn = JSON.parse(\n" +
      "\t\tJSON.stringify(gameState.turns[gameState.turns.length - 1]));\n\n" +
      "\ncurrentTurn.turn += 1;\n\n" +
      statements_block +
      "\n\tcurrentTurn = CalculateCombat(currentTurn);\n" +
      "\ncurrentTurn = UpdateResources(currentTurn);\n" +
      "\tevents = GatherImportantEvents();\n" +
      "\tgameRuns = !CheckForGameEnd(gameTurn);\n" +
      "\tgameTurn += 1;\n" +
      "\tgameState.turns.push(currentTurn);\n};\n" +
      "console.log(gameState);";
    return code;
  },
};

export default mainLoop;

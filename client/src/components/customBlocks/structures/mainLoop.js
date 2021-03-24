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
      'var gameStartState = require("./gameState.json");\n\n' +
      "const playerId = 'player1';\n" +
      "const game = new GameEngine(gameStartState);\n\n" +
      "while (game.IsRunning()) {\n" +
      statements_block +
      "\n\tgame.TurnEnd();\n};\n" +
      "console.log(game.commands);\n" +
      "console.log(game.gameState);\n";
    return code;
  },
};

export default mainLoop;

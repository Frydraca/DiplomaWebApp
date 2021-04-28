import Blockly from "node-blockly/browser";

export const attack = {
  name: "Attack",
  category: "Actions",
  block: {
    init: function () {
      this.jsonInit({
        type: "action_attack",
        message0: "Attack",
        previousStatement: null,
        nextStatement: null,
        colour: 290,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    // TODO: Assemble JavaScript into code variable.
    var code = "this.Attack(playerId)\n";
    return code;
  },
};

export default attack;

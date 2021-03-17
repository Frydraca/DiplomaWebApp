import Blockly from "node-blockly/browser";

export const defaultTactic = {
  name: "Default Tactic",
  category: "CombatTactics",
  block: {
    init: function () {
      this.jsonInit({
        type: "combat_default",
        message0: "Default tactic",
        output: "CombatTactic",
        colour: 0,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    // TODO: Assemble JavaScript into code variable.
    var code = "...";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default defaultTactic;

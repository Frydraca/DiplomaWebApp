import Blockly from "node-blockly/browser";

export const combatUnit = {
  name: "Combat Unit",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "combat_unit",
        message0: "Combat units %1 Cohesion rules %2 Tactic %3",
        args0: [
          {
            type: "input_value",
            name: "UnitGroup",
            check: "Group",
          },
          {
            type: "input_value",
            name: "Cohesion",
            check: "CohesionRule",
          },
          {
            type: "input_value",
            name: "Tactic",
            check: "CombatTactic",
          },
        ],
        output: "CombatUnit",
        colour: 180,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_unitgroup = Blockly.JavaScript.valueToCode(
      block,
      "UnitGroup",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var value_cohesion = Blockly.JavaScript.valueToCode(
      block,
      "Cohesion",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var value_tactic = Blockly.JavaScript.valueToCode(
      block,
      "Tactic",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "...";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default combatUnit;

import Blockly from "node-blockly/browser";

export const useCombatUnit = {
  name: "Use combat unit",
  category: "Actions",
  block: {
    init: function () {
      this.jsonInit({
        type: "action_use",
        message0: "Use combat unit %1",
        args0: [
          {
            type: "input_value",
            name: "CombatUnitToUse",
            check: "CombatUnit",
          },
        ],
        previousStatement: ["Block", "Action"],
        nextStatement: "Action",
        colour: 290,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_combatunittouse = Blockly.JavaScript.valueToCode(
      block,
      "CombatUnitToUse",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "...;\n";
    return code;
  },
};

export default useCombatUnit;

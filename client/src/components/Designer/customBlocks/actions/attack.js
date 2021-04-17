import Blockly from "node-blockly/browser";

export const attack = {
  name: "Attack",
  category: "Actions",
  block: {
    init: function () {
      this.jsonInit({
        type: "action_attack",
        message0: "Attack with %1 Target %2",
        args0: [
          {
            type: "input_value",
            name: "AttackingUnits",
            check: "UnitGroup",
          },
          {
            type: "input_value",
            name: "Target",
            check: ["GameObject", "Building"],
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 290,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_attackingunits = Blockly.JavaScript.valueToCode(
      block,
      "AttackingUnits",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var value_target = Blockly.JavaScript.valueToCode(
      block,
      "Target",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code =
      "AttackTarget(" + value_attackingunits + ", " + value_target + ");\n";
    return code;
  },
};

export default attack;

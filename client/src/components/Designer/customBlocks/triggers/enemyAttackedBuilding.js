import Blockly from "node-blockly/browser";

export const enemyAttackedBuilding = {
  name: "Enemy Attacked Building",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "trigger_enemy_attacked",
        message0: "Enemy attacked %1 building %2",
        args0: [
          {
            type: "input_dummy",
          },
          {
            type: "input_value",
            name: "AttackedBuilding",
            check: "Building",
          },
        ],
        previousStatement: ["Structure", "Trigger"],
        nextStatement: "Trigger",
        colour: 230,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_attackedbuilding = Blockly.JavaScript.valueToCode(
      block,
      "AttackedBuilding",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "...;\n";
    return code;
  },
};

export default enemyAttackedBuilding;

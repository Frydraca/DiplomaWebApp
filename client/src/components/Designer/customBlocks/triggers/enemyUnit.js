import Blockly from "node-blockly/browser";

export const enemyUnit = {
  name: "Enemy Unit",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "enemyunit",
        message0: "The enemy has %1",
        args0: [
          {
            type: "input_value",
            name: "unitType",
            check: "Unit",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 230,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_unittype = Blockly.JavaScript.valueToCode(
      block,
      "unitType",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "...;\n";
    return code;
  },
};

export default enemyUnit;

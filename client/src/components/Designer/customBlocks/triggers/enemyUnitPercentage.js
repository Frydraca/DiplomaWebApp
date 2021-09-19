import Blockly from "node-blockly/browser";

export const enemyUnitPercentage = {
  name: "Enemy Unit Percentage",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "enemyunitpercentage",
        message0: "The enemy has %1 over %2 percentage.",
        args0: [
          {
            type: "input_value",
            name: "Unit",
            check: "Unit",
          },
          {
            type: "field_number",
            name: "percentage",
            value: 0,
            min: 0,
            max: 100,
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
    var value_unit = Blockly.JavaScript.valueToCode(
      block,
      "Unit",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var number_percentage = block.getFieldValue("percentage");
    // TODO: Assemble JavaScript into code variable.
    var code = "...;\n";
    return code;
  },
};

export default enemyUnitPercentage;

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
        previousStatement: "Trigger",
        nextStatement: "Trigger",
        colour: 230,
        tooltip:
          "Gets the percentage of a given unit in the enemy's army, and returns true if its equal to or over the given number. the given number must be between 0 and 100.\n" +
          "Mandatory input: Unit\n" +
          "Previous Statement: Trigger\n" +
          "Next Statement: Trigger or nothing\n" +
          "Statement type: Trigger",
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
    var code =
      "this.GetPercentageOfOwn(" +
      value_unit +
      ", enemyId) >= " +
      number_percentage +
      " &&";
    return code;
  },
};

export default enemyUnitPercentage;

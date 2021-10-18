import Blockly from "node-blockly/browser";

export const enemyUnit = {
  name: "Enemy Unit",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "enemyunit",
        message0: "The enemy %1 %2",
        args0: [
          {
            type: "field_dropdown",
            name: "HaveBool",
            options: [
              ["has", "Has"],
              ["doesn't have", "Dont"],
            ],
          },
          {
            type: "input_value",
            name: "unitType",
            check: "Unit",
          },
        ],
        previousStatement: "Trigger",
        nextStatement: "Trigger",
        colour: 230,
        tooltip:
          "Gets if the enemy has or doesn't have at least one of the given unit.\n" +
          "Mandatory input: Unit\n" +
          "Previous Statement: Trigger\n" +
          "Next Statement: Trigger or nothing\n" +
          "Statement type: Trigger",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_havesomething = Blockly.JavaScript.valueToCode(
      block,
      "unitType",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var dropdown_havebool = block.getFieldValue("HaveBool");
    // TODO: Assemble JavaScript into code variable.
    var negator = "!";
    if (dropdown_havebool === "Has") {
      negator = "";
    }
    var code = negator + "this.Have(enemyId, " + value_havesomething + ") &&";
    return code;
  },
};

export default enemyUnit;

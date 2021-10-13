import Blockly from "node-blockly/browser";

export const haveSomething = {
  name: "HaveSomething",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "trigger_have",
        message0: "You %1 %2",
        args0: [
          {
            type: "field_dropdown",
            name: "haveBool",
            options: [
              ["have", "Have"],
              ["don't have", "Dont"],
            ],
          },
          {
            type: "input_value",
            name: "HaveSomething",
            check: ["Building", "Unit", "UnitUpgrade"],
          },
        ],
        previousStatement: "Trigger",
        nextStatement: "Trigger",
        colour: 230,
        tooltip:
          "Returns true if you have or don't have at least one of the given building, unit, or upgrade.\n" +
          "Mandatory input: Building or Unit or UnitUpgrade\n" +
          "Previous Statement: Trigger\n" +
          "Next Statement: Trigger or nothing\n" +
          "Statement type: Trigger",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_havebool = block.getFieldValue("haveBool");
    var value_havesomething = Blockly.JavaScript.valueToCode(
      block,
      "HaveSomething",
      Blockly.JavaScript.ORDER_ATOMIC
    );

    // TODO: Assemble JavaScript into code variable.
    var negator = "!";
    if (dropdown_havebool === "Have") {
      negator = "";
    }

    if (value_havesomething.substring(value_havesomething.length - 1) === ")") {
      value_havesomething = value_havesomething.substring(
        0,
        value_havesomething.length - 1
      );
    }
    if (value_havesomething.substring(0, 1) === "(") {
      value_havesomething = value_havesomething.substring(1);
    }

    var code = negator + "this.Have(playerId, " + value_havesomething + ")";
    return code;
  },
};

export default haveSomething;

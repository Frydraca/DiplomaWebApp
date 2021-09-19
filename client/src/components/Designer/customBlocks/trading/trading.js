import Blockly from "node-blockly/browser";

export const trading = {
  name: "Trading",
  category: "Trading",
  block: {
    init: function () {
      this.jsonInit({
        type: "trading",
        message0: "%1 %2 , when you have %3  than: %4",
        args0: [
          {
            type: "field_dropdown",
            name: "Action",
            options: [
              ["Buy", "Buy"],
              ["Sell", "Sell"],
            ],
          },
          {
            type: "input_value",
            name: "Resource",
            check: "Resource",
          },
          {
            type: "field_dropdown",
            name: "relation",
            options: [
              ["less", "less"],
              ["more", "more"],
            ],
          },
          {
            type: "field_number",
            name: "value",
            value: 0,
            min: 0,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_action = block.getFieldValue("Action");
    var value_resource = Blockly.JavaScript.valueToCode(
      block,
      "Resource",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var dropdown_relation = block.getFieldValue("relation");
    var number_value = block.getFieldValue("value");
    // TODO: Assemble JavaScript into code variable.

    var formattedResource = "";
    switch (value_resource) {
      case "(Energy)":
        formattedResource = "energy";
        break;
      case "(Steel)":
        formattedResource = "steel";
        break;
      case "(RoboSteel)":
        formattedResource = "roboSteel";
        break;
      case "(Crystal)":
        formattedResource = "crystal";
        break;
      case "(EnergyCore)":
        formattedResource = "energyCore";
        break;
      case "(Credits)":
        formattedResource = "credits";
        break;
      default:
        formattedResource = "Unrecognized type!";
        break;
    }

    var code =
      ", this." +
      dropdown_action +
      "(playerId, '" +
      formattedResource +
      "', " +
      number_value +
      ")";
    return code;
  },
};

export default trading;

import Blockly from "node-blockly/browser";

export const groupElement = {
  name: "Group Element",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "type_group_element",
        message0: "%1 %2",
        args0: [
          {
            type: "field_number",
            name: "Number",
            value: 0,
            min: 0,
          },
          {
            type: "input_value",
            name: "NAME",
            check: ["Building", "Unit"],
          },
        ],
        previousStatement: ["Group", "GroupElement"],
        nextStatement: "GroupElement",
        colour: 180,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var number_number = block.getFieldValue("Number");
    var value_name = Blockly.JavaScript.valueToCode(
      block,
      "NAME",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var formattedValue = "";
    // TODO Towers and units
    switch (value_name) {
      case "(CommandCenter)":
        formattedValue = "CommandCenterData";
        break;
      case "(SteelMine)":
        formattedValue = "SteelMineData";
        break;
      case "(SolarPowerPlant)":
        formattedValue = "SolarPowerPlantData";
        break;
      case "(CrystalMine)":
        formattedValue = "CrystalMineData";
        break;
      case "(Foundry)":
        formattedValue = "FoundryData";
        break;
      case "(CoreFactory)":
        formattedValue = "CoreFactoryData";
        break;
      case "(Workshop)":
        formattedValue = "WorkshopData";
        break;
      default:
        formattedValue = "Unrecognized type!";
        break;
    }

    var code =
      ", this.GroupElement(" + formattedValue + ", " + number_number + ")";
    return code;
  },
};

export default groupElement;

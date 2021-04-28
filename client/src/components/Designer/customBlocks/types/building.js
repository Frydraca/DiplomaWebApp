import Blockly from "node-blockly/browser";

export const building = {
  name: "Building",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "type_building",
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "Building",
            options: [
              ["Command Center", "CommandCenter"],
              ["Solar Power Plant", "SolarPowerPlant"],
              ["Steel Mine", "SteelMine"],
              ["Crystal Mine", "CrystalMine"],
              ["Foundry", "Foundry"],
              ["Core Factory", "CoreFactory"],
              ["Workshop", "Workshop"],
              ["Tower", "Tower"],
            ],
          },
        ],
        output: ["GameObject", "Building"],
        colour: 180,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_building = block.getFieldValue("Building");
    // TODO: Assemble JavaScript into code variable.
    var formattedValue = "";
    // TODO Towers
    switch (dropdown_building) {
      case "CommandCenter":
        formattedValue = "CommandCenterData";
        break;
      case "SteelMine":
        formattedValue = "SteelMineData";
        break;
      case "SolarPowerPlant":
        formattedValue = "SolarPowerPlantData";
        break;
      case "CrystalMine":
        formattedValue = "CrystalMineData";
        break;
      case "Foundry":
        formattedValue = "FoundryData";
        break;
      case "CoreFactory":
        formattedValue = "CoreFactoryData";
        break;
      case "Workshop":
        formattedValue = "WorkshopData";
        break;
      default:
        formattedValue = "Unrecognized type!";
        break;
    }
    var code = formattedValue;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default building;

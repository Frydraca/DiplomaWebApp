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
            ],
          },
        ],
        output: "Building",
        colour: 180,
        tooltip:
          "Building types of the game. Use as type input.\nOutput: Building",
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
        formattedValue = "'Command Center'";
        break;
      case "SteelMine":
        formattedValue = "'Steel Mine'";
        break;
      case "SolarPowerPlant":
        formattedValue = "'Solar Power Plant'";
        break;
      case "CrystalMine":
        formattedValue = "'Crystal Mine'";
        break;
      case "Foundry":
        formattedValue = "'Foundry'";
        break;
      case "CoreFactory":
        formattedValue = "'Core Factory'";
        break;
      case "Workshop":
        formattedValue = "'Workshop'";
        break;
      default:
        formattedValue = "'Unrecognized type!'";
        break;
    }
    var code = formattedValue;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default building;

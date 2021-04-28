import Blockly from "node-blockly/browser";

export const unit = {
  name: "Unit",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "type_unit",
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "Unit",
            options: [
              ["Raider Bots", "RaiderBots"],
              ["Attack Bots", "AttackBots"],
              ["Tank Bots", "TankBots"],
              ["Artillery Bots", "ArtilleryBots"],
            ],
          },
        ],
        output: ["GameObject", "Unit"],
        colour: 180,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_unit = block.getFieldValue("Unit");
    // TODO: Assemble JavaScript into code variable.
    var formattedValue = "";
    switch (dropdown_unit) {
      case "ArtilleryBots":
        formattedValue = "ArtilleryBotData";
        break;
      case "AttackBots":
        formattedValue = "AttackBotData";
        break;
      case "RaiderBots":
        formattedValue = "RaiderBotData";
        break;
      case "TankBots":
        formattedValue = "TankBotData";
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

export default unit;

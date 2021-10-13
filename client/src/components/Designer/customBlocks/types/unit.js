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
        output: "Unit",
        colour: 180,
        tooltip: "Unit types of the game. Use as type input.\nOutput: Unit",
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
        formattedValue = "'Artillery Bot'";
        break;
      case "AttackBots":
        formattedValue = "'Attack Bot'";
        break;
      case "RaiderBots":
        formattedValue = "'Raider Bot'";
        break;
      case "TankBots":
        formattedValue = "'Tank Bot'";
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

export default unit;

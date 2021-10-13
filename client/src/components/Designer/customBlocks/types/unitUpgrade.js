import Blockly from "node-blockly/browser";

export const unitUpgrade = {
  name: "Unit Upgrade",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "unitupgrade",
        message0: "Unit %1 Upgrade %2",
        args0: [
          {
            type: "input_value",
            name: "unitType",
            check: "Unit",
          },
          {
            type: "input_value",
            name: "upgradeType",
            check: "UpgradeType",
          },
        ],
        output: "UnitUpgrade",
        colour: 180,
        tooltip:
          "A combined type of a unit and an upgrade type. Use as a type input, if you need to check the existence of an upgrade.\n" +
          "Mandatory input: Unit and UpgradeType\n" +
          "Output: UnitUpgrade",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_unittype = Blockly.JavaScript.valueToCode(
      block,
      "unitType",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var value_upgradetype = Blockly.JavaScript.valueToCode(
      block,
      "upgradeType",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = value_unittype + ", " + value_upgradetype;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default unitUpgrade;

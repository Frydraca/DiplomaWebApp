import Blockly from "node-blockly/browser";

export const upgrade = {
  name: "Upgrade",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "upgradetype",
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "statType",
            options: [
              ["attack", "Attack"],
              ["armor", "Armor"],
              ["hit points", "Hit Points"],
              ["speed", "Speed"],
            ],
          },
        ],
        output: "UpgradeType",
        colour: 180,
        tooltip:
          "Upgrade type for units. Use as a type input.\n" +
          "Output: UpgradeType",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_stattype = block.getFieldValue("statType");
    // TODO: Assemble JavaScript into code variable.
    var code = "'" + dropdown_stattype + "'";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default upgrade;

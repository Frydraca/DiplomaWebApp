import Blockly from "node-blockly/browser";

export const upgradeStat = {
  name: "Upgrade Stat",
  category: "Research",
  block: {
    init: function () {
      this.jsonInit({
        type: "upgradestat",
        message0: "Upgrade %1 of %2",
        args0: [
          {
            type: "field_dropdown",
            name: "stat",
            options: [
              ["attack", "attack"],
              ["armor", "armor"],
              ["hit points", "hitPoints"],
              ["move speed", "speed"],
            ],
          },
          {
            type: "input_value",
            name: "upgradeTarget",
            check: "Unit",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 120,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_stat = block.getFieldValue("stat");
    var value_upgradetarget = Blockly.JavaScript.valueToCode(
      block,
      "upgradeTarget",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "...;\n";
    return code;
  },
};

export default upgradeStat;

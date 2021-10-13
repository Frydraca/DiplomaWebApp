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
              ["attack", "Attack"],
              ["armor", "Armor"],
              ["hit points", "Hit Points"],
              ["move speed", "Speed"],
            ],
          },
          {
            type: "input_value",
            name: "upgradeTarget",
            check: "Unit",
          },
        ],
        previousStatement: "ResearchTask",
        nextStatement: "ResearchTask",
        colour: 120,
        tooltip:
          "Research to upgrade a given unit selected stats.\n" +
          "Mandatory Input: Unit\n" +
          "Previous Connection: ResearchTask\n" +
          "Next Connection: ResearchTask or nothing\n" +
          "Statement type: ResearchTask",
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
    var code =
      ", this.UpgradeStats(playerId," +
      value_upgradetarget +
      ", '" +
      dropdown_stat +
      "')";
    return code;
  },
};

export default upgradeStat;

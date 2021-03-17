import Blockly from "node-blockly/browser";

export const rading = {
  name: "Raiding",
  category: "CombatTactics",
  block: {
    init: function () {
      this.jsonInit({
        type: "combat_raiding",
        message0: "Raiding %1",
        args0: [
          {
            type: "field_dropdown",
            name: "Condition",
            options: [
              ["Fight enemy defenders", "Fight"],
              ["Retreat from enemy defenders", "Retreat"],
              ["Hit and run", "HitAndRun"],
            ],
          },
        ],
        output: "CombatTactic",
        colour: 0,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_condition = block.getFieldValue("Condition");
    // TODO: Assemble JavaScript into code variable.
    var code = "...";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default rading;

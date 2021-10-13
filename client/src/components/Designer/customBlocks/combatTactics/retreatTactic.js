import Blockly from "node-blockly/browser";

export const retreatTactic = {
  name: "Retreat Tactic",
  category: "Combat Tactics",
  block: {
    init: function () {
      this.jsonInit({
        type: "retreat",
        message0:
          "Individual retreat allowed %1 %2 Group retreat under %3 %% strength %4 Individual retreat under %5 %% strength",
        args0: [
          {
            type: "field_checkbox",
            name: "individualRetreat",
            checked: true,
          },
          {
            type: "input_dummy",
          },
          {
            type: "field_number",
            name: "retreatPercentage",
            value: 0,
            min: 0,
            max: 100,
          },
          {
            type: "input_dummy",
          },
          {
            type: "field_number",
            name: "individualRetreatPercentage",
            value: 0,
            min: 0,
            max: 100,
          },
        ],
        previousStatement: "Tactic",
        nextStatement: "Tactic",
        colour: 0,
        tooltip:
          "Define a retreat combat tactic. Use for combat groups.\n" +
          "Previous Statement: Tactic\n" +
          "Next Statement: Tactic or nothing\n" +
          "Statement type: Tactic",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var checkbox_individualretreat =
      block.getFieldValue("individualRetreat") == "TRUE";
    var number_retreatpercentage = block.getFieldValue("retreatPercentage");
    var number_individualretreatpercentage = block.getFieldValue(
      "individualRetreatPercentage"
    );
    // TODO: Assemble JavaScript into code variable.
    var code =
      ", this.RetreatTactic(" +
      number_retreatpercentage +
      "," +
      checkbox_individualretreat +
      "," +
      number_individualretreatpercentage +
      ")";
    return code;
  },
};

export default retreatTactic;

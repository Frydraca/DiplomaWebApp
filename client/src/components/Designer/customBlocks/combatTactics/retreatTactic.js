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
        previousStatement: null,
        nextStatement: null,
        colour: 0,
        tooltip: "",
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
    var code = "...;\n";
    return code;
  },
};

export default retreatTactic;

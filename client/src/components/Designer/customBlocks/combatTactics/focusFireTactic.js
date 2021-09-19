import Blockly from "node-blockly/browser";

export const focusFireTactic = {
  name: "Focus Fire Tactic",
  category: "Combat Tactics",
  block: {
    init: function () {
      this.jsonInit({
        type: "focusfire",
        message0: "Focus fire on %1 %2 Focus only units %3",
        args0: [
          {
            type: "field_dropdown",
            name: "Target",
            options: [
              ["closest enemy", "closest"],
              ["lowest hp enemy", "lowest"],
              ["strongest enemy", "strongest"],
            ],
          },
          {
            type: "input_dummy",
          },
          {
            type: "field_checkbox",
            name: "unitFocus",
            checked: true,
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
    var dropdown_target = block.getFieldValue("Target");
    var checkbox_unitfocus = block.getFieldValue("unitFocus") == "TRUE";
    // TODO: Assemble JavaScript into code variable.
    var code = "...;\n";
    return code;
  },
};

export default focusFireTactic;

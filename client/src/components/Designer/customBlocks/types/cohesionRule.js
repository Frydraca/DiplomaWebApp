import Blockly from "node-blockly/browser";

export const cohesionRule = {
  name: "Cohesion Rule",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "type_cohesion",
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "CohesionRule",
            options: [
              ["Reinforce immediately", "ReinforceImmediately"],
              ["Reinforce at half strength", "ReinforceHalf"],
              ["Use as reinforcement for others", "UseAsReinforcement"],
              ["Leave the group as it is", "LeaveItAlone"],
            ],
          },
        ],
        output: "CohesionRule",
        colour: 180,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_cohesionrule = block.getFieldValue("CohesionRule");
    // TODO: Assemble JavaScript into code variable.
    var code = "...";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default cohesionRule;

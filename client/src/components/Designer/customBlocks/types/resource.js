import Blockly from "node-blockly/browser";

export const resource = {
  name: "Resource",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "type_resource",
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "Resource",
            options: [
              ["Energy", "Energy"],
              ["Steel", "Steel"],
              ["Robosteel", "RoboSteel"],
              ["Crystal", "Crystal"],
              ["Energy Core", "EnergyCore"],
              ["Credits", "Credits"],
            ],
          },
        ],
        output: "Resource",
        colour: 180,
        tooltip:
          "Resource types of the game. Use as type input.\n" +
          "Output: Resource",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_resource = block.getFieldValue("Resource");
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_resource;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default resource;

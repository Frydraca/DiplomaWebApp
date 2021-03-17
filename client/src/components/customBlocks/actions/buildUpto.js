import Blockly from "node-blockly/browser";

export const buildUpto = {
  name: "Build Up to",
  category: "Actions",
  block: {
    init: function () {
      this.jsonInit({
        type: "action_build_upto",
        message0: "Build up to %1",
        args0: [
          {
            type: "input_value",
            name: "BuildingGroup",
            check: "Group",
          },
        ],
        previousStatement: ["Block", "Action"],
        nextStatement: ["Block", "Action"],
        colour: 290,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_buildinggroup = Blockly.JavaScript.valueToCode(
      block,
      "BuildingGroup",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "BuildUpTo(turnState," + value_buildinggroup + ")";
    return code;
  },
};

export default buildUpto;

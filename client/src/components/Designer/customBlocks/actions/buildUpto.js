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
        previousStatement: ["Action"],
        nextStatement: ["Action"],
        colour: 290,
        tooltip:
          "Block to specify the order of building Buildings.\n" +
          "Mandatory Input: Group (with Building option selected)\n" +
          "Previous Statement: Action\n" +
          "Next Statement: Action or nothing\n" +
          "Statement type: Action",
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
    value_buildinggroup = value_buildinggroup.substring(1);
    value_buildinggroup = value_buildinggroup.substring(
      0,
      value_buildinggroup.length - 1
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "this.BuildUpTo(playerId," + value_buildinggroup + ")";
    return code;
  },
};

export default buildUpto;

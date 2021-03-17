import Blockly from "node-blockly/browser";

export const build = {
  name: "Build",
  category: "Actions",
  block: {
    init: function () {
      this.jsonInit({
        type: "action_build",
        message0: "Build  %1 %2",
        args0: [
          {
            type: "field_number",
            name: "Number",
            value: 0,
            min: 0,
          },
          {
            type: "input_value",
            name: "BuildingToBuild",
            check: "Building",
          },
        ],
        previousStatement: ["Block", "Action"],
        nextStatement: "Action",
        colour: 290,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_buildingtobuild = Blockly.JavaScript.valueToCode(
      block,
      "BuildingToBuild",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var number_number = block.getFieldValue("Number");
    // TODO: Assemble JavaScript into code variable.
    var code = "Build(" + value_buildingtobuild + ", " + number_number + ");\n";
    return code;
  },
};

export default build;

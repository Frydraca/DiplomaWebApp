import Blockly from "node-blockly/browser";

export const group = {
  name: "Group",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "type_group",
        message0: "%1 Group %2",
        args0: [
          {
            type: "field_dropdown",
            name: "GroupType",
            options: [
              ["Unit", "Unit"],
              ["Building", "Building"],
            ],
          },
          {
            type: "input_statement",
            name: "Group",
            check: "GroupElement",
          },
        ],
        output: "Group",
        colour: 180,
        tooltip:
          "Block to construct groups of Buildings or Units. Must specify the group type with the dropdown options. Building and Unit group elements can not be mixed.\n" +
          "Mandatory Input: At least one GroupElement statement.\n" +
          "Output: Group\n" +
          "Statement type: Group",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_grouptype = block.getFieldValue("GroupType");
    var statements_group = Blockly.JavaScript.statementToCode(block, "Group");

    // TODO: Assemble JavaScript into code variable.
    var code =
      'this.Group("' + dropdown_grouptype + '"' + statements_group + ")";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default group;

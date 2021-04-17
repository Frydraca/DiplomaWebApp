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
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var dropdown_grouptype = block.getFieldValue("GroupType");
    var statements_group = Blockly.JavaScript.statementToCode(block, "Group");

    console.log(statements_group);
    // if (len(statements_group) > 1) {
    //   delimiter = ",";
    // }
    // TODO: Assemble JavaScript into code variable.
    var code = 'Group("' + dropdown_grouptype + '"' + statements_group + ")";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default group;

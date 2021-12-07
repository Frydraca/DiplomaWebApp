import Blockly from "node-blockly/browser";

export const groupElement = {
  name: "Group Element",
  category: "Types",
  block: {
    init: function () {
      this.jsonInit({
        type: "type_group_element",
        message0: "%1 %2",
        args0: [
          {
            type: "field_number",
            name: "Number",
            value: 1,
            min: 1,
          },
          {
            type: "input_value",
            name: "Object",
            check: ["Building", "Unit"],
          },
        ],
        previousStatement: ["Group", "GroupElement"],
        nextStatement: "GroupElement",
        colour: 180,
        tooltip:
          "Block to specify the number of objects in a given type. Use for constructing groups. Amount number is positive only.\n" +
          "Mandatory Input: Building or Unit.\n" +
          "Previous Statement: Group or GroupElement\n" +
          "Next Statement: GroupElement or nothing\n" +
          "Statement type: GroupElement",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var number_number = block.getFieldValue("Number");
    var value_name = Blockly.JavaScript.valueToCode(
      block,
      "Object",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var formattedValue = value_name.replace("(", "").replace(")", "");
    var code =
      ", this.GroupElement(" + formattedValue + ", " + number_number + ")";
    return code;
  },
};

export default groupElement;

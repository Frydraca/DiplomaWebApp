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
            value: 0,
            min: 0,
          },
          {
            type: "input_value",
            name: "NAME",
            check: ["Building", "Unit"],
          },
        ],
        previousStatement: ["Group", "GroupElement"],
        nextStatement: "GroupElement",
        colour: 180,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var number_number = block.getFieldValue("Number");
    var value_name = Blockly.JavaScript.valueToCode(
      block,
      "NAME",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = ', GroupElement("' + value_name + '", ' + number_number + ")";
    return code;
  },
};

export default groupElement;

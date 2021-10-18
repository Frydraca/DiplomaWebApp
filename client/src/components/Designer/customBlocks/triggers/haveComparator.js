import Blockly from "node-blockly/browser";

export const haveComparator = {
  name: "Have Comparator",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "havecomparator",
        message0: "You have %1 %2 than %3",
        args0: [
          {
            type: "input_value",
            name: "object",
            check: ["Building", "Unit"],
          },
          {
            type: "field_dropdown",
            name: "comparator",
            options: [
              ["less", "<"],
              ["more", ">"],
            ],
          },
          {
            type: "field_number",
            name: "value",
            value: 0,
            min: 0,
          },
        ],
        previousStatement: "Trigger",
        nextStatement: "Trigger",
        colour: 230,
        tooltip:
          "Returns true if you have (equal or more) or less than the given number of a building or a unit.\n" +
          "Mandatory input: Building or Unit\n" +
          "Previous Statement: Trigger\n" +
          "Next Statement: Trigger or nothing\n" +
          "Statement type: Trigger",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_object = Blockly.JavaScript.valueToCode(
      block,
      "object",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var dropdown_comparator = block.getFieldValue("comparator");
    var number_value = block.getFieldValue("value");
    // TODO: Assemble JavaScript into code variable.
    var code =
      "this.GetNumberOfOwn(" +
      value_object +
      ", playerId)" +
      dropdown_comparator +
      number_value +
      " &&";
    return code;
  },
};

export default haveComparator;

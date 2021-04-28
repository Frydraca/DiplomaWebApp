import Blockly from "node-blockly/browser";

export const hasLessThan = {
  name: "DontHave",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "trigger_dont_have_building",
        message0: "You have %1 less than %2",
        args0: [
          {
            type: "input_value",
            name: "Subject",
            check: "GameObject",
          },
          {
            type: "field_number",
            name: "Number",
            value: 0,
            min: 0,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 230,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_subject = Blockly.JavaScript.valueToCode(
      block,
      "Subject",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var number_number = block.getFieldValue("Number");
    // TODO: Assemble JavaScript into code variable.
    var code =
      "this.GetNumberOfOwn(" +
      value_subject +
      ", playerId)" +
      " < " +
      number_number;
    return code;
  },
};

export default hasLessThan;

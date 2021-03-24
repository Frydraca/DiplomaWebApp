import Blockly from "node-blockly/browser";

export const haveSomething = {
  name: "HaveSomething",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "trigger_have",
        message0: "You %1 %2",
        args0: [
          {
            type: "field_dropdown",
            name: "haveBool",
            options: [
              ["have", "Have"],
              ["don't have", "Dont"],
            ],
          },
          {
            type: "input_value",
            name: "HaveSomething",
            check: "GameObject",
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
    var dropdown_havebool = block.getFieldValue("haveBool");
    var value_havesomething = Blockly.JavaScript.valueToCode(
      block,
      "HaveSomething",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    console.log(dropdown_havebool);
    // TODO: Assemble JavaScript into code variable.
    var negator = "!";
    if (dropdown_havebool === "Have") {
      negator = "";
    }

    var code = negator + "Have(" + value_havesomething + ")";
    return code;
  },
};

export default haveSomething;
